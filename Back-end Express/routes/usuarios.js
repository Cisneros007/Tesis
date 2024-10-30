const express = require('express');
const router = express.Router();
const db = require('../db');  // Importa la conexión a la base de datos

// Obtener todos los usuarios
router.get('/', (req, res) => {
  db.query('SELECT * FROM Usuario', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const { nombre, apellido, dni, telefono, email, direccion } = req.body;
  db.query(
    'INSERT INTO Usuario (nombre, apellido, dni, telefono, email, direccion) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, apellido, dni, telefono, email, direccion],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId });
    }
  );
});

// Actualizar un usuario por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, dni, telefono, email, direccion } = req.body;
  db.query(
    'UPDATE Usuario SET nombre = ?, apellido = ?, dni = ?, telefono = ?, email = ?, direccion = ? WHERE idusuario = ?',
    [nombre, apellido, dni, telefono, email, direccion, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Usuario actualizado correctamente' });
    }
  );
});

// Eliminar un usuario por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Usuario WHERE idusuario = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

module.exports = router;
