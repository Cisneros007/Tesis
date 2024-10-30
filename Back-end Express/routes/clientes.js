const express = require('express');
const router = express.Router();
const db = require('../db');  // Importa la conexión a la base de datos

// Obtener todos los clientes
router.get('/', (req, res) => {
  db.query('SELECT * FROM Clientes', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Crear un nuevo cliente
router.post('/', (req, res) => {
  const { nombre, apellido, dni, telefono, email, direccion } = req.body;
  db.query(
    'INSERT INTO Clientes (nombre, apellido, dni, telefono, email, direccion) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, apellido, dni, telefono, email, direccion],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId });
    }
  );
});

// Actualizar un cliente por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, dni, telefono, email, direccion } = req.body;
  db.query(
    'UPDATE Clientes SET nombre = ?, apellido = ?, dni = ?, telefono = ?, email = ?, direccion = ? WHERE idCliente = ?',
    [nombre, apellido, dni, telefono, email, direccion, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Cliente actualizado correctamente' });
    }
  );
});

// Eliminar un cliente por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Clientes WHERE idCliente = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Cliente eliminado correctamente' });
  });
});

module.exports = router;
