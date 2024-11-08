const express = require('express');
const router = express.Router();
const db = require('../db');  // Importa la conexión a la base de datos

// Obtener todos los usuarios
router.get('/', (req, res) => {
  db.query('SELECT * FROM Usuario', (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json(results);
  });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const { nombre, apellido, dni, telefono, email, direccion } = req.body;
  
  // Verifica que todos los campos obligatorios estén presentes
  if (!nombre || !apellido || !dni || !telefono || !email || !direccion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  db.query(
    'INSERT INTO Usuario (nombre, apellido, dni, telefono, email, direccion) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, apellido, dni, telefono, email, direccion],
    (err, result) => {
      if (err) {
        console.error('Error al crear usuario:', err);
        return res.status(500).json({ error: 'Error al crear usuario' });
      }
      res.status(201).json({ id: result.insertId, message: 'Usuario creado exitosamente' });
    }
  );
});

// Actualizar un usuario por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, dni, telefono, email, direccion } = req.body;
  
  // Verifica que todos los campos obligatorios estén presentes
  if (!nombre || !apellido || !dni || !telefono || !email || !direccion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  db.query(
    'UPDATE Usuario SET nombre = ?, apellido = ?, dni = ?, telefono = ?, email = ?, direccion = ? WHERE idusuario = ?',
    [nombre, apellido, dni, telefono, email, direccion, id],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar usuario:', err);
        return res.status(500).json({ error: 'Error al actualizar usuario' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario actualizado correctamente' });
    }
  );
});

// Eliminar un usuario por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Usuario WHERE idusuario = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar usuario:', err);
      return res.status(500).json({ error: 'Error al eliminar usuario' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

module.exports = router;
