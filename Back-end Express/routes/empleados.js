const express = require('express');
const router = express.Router();
const db = require('../db');  // Importa la conexión a la base de datos

// Obtener todos los empleados
router.get('/', (req, res) => {
  db.query('SELECT * FROM Empleados', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Crear un nuevo empleado
router.post('/', (req, res) => {
  const { nombre, apellido, dni, telefono, email, direccion } = req.body;
  db.query(
    'INSERT INTO Empleados (nombre, apellido, dni, telefono, email, direccion) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, apellido, dni, telefono, email, direccion],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId });
    }
  );
});

// Actualizar un empleado por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, dni, telefono, email, direccion } = req.body;
  db.query(
    'UPDATE Empleados SET nombre = ?, apellido = ?, dni = ?, telefono = ?, email = ?, direccion = ? WHERE idEmpleado = ?',
    [nombre, apellido, dni, telefono, email, direccion, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Empleado actualizado correctamente' });
    }
  );
});

// Eliminar un empleado por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Empleados WHERE idEmpleado = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Empleado eliminado correctamente' });
  });
});

module.exports = router;
