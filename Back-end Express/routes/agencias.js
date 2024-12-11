const express = require('express');
const router = express.Router();
const db = require('../db'); // Importa la conexión a la base de datos

// Obtener todas las agencias
router.get('/', (req, res) => {
  db.query('SELECT * FROM agencias', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Crear una nueva agencia
router.post('/', (req, res) => {
  const { nombre, direccion, latitude, longitude, email, image } = req.body;
  db.query(
    'INSERT INTO agencias (nombre, direccion, latitude, longitude, email, image) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, direccion, latitude, longitude, email, image],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, message: 'Agencia creada correctamente' });
    }
  );
});

// Actualizar una agencia por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, latitude, longitude, email, image } = req.body;
  db.query(
    'UPDATE agencias SET nombre = ?, direccion = ?, latitude = ?, longitude = ?, email = ?, image = ? WHERE id = ?',
    [nombre, direccion, latitude, longitude, email, image, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Agencia actualizada correctamente' });
    }
  );
});

// Eliminar una agencia por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM agencias WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Agencia eliminada correctamente' });
  });
});

module.exports = router;
