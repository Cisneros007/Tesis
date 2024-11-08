// routes/serviciosTerrestres.js
const express = require('express');
const router = express.Router();
const db = require('../db');  // Importa la conexión a la base de datos

// Obtener todos los servicios terrestres
router.get('/', (req, res) => {
  db.query('SELECT * FROM ServiciosTerrestres', (err, results) => {
    if (err) {
      console.error('Error al obtener servicios terrestres:', err);
      return res.status(500).json({ error: 'Error al obtener servicios terrestres' });
    }
    res.json(results);
  });
});

// Crear un nuevo servicio terrestre
router.post('/', (req, res) => {
  const { nombre, descripcion } = req.body;

  // Verifica que todos los campos obligatorios estén presentes
  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  db.query(
    'INSERT INTO ServiciosTerrestres (nombre, descripcion) VALUES (?, ?)',
    [nombre, descripcion],
    (err, result) => {
      if (err) {
        console.error('Error al crear servicio terrestre:', err);
        return res.status(500).json({ error: 'Error al crear servicio terrestre' });
      }
      res.status(201).json({ id: result.insertId, message: 'Servicio terrestre creado exitosamente' });
    }
  );
});

// Actualizar un servicio terrestre por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  // Verifica que todos los campos obligatorios estén presentes
  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  db.query(
    'UPDATE ServiciosTerrestres SET nombre = ?, descripcion = ? WHERE id = ?',
    [nombre, descripcion, id],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar servicio terrestre:', err);
        return res.status(500).json({ error: 'Error al actualizar servicio terrestre' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Servicio terrestre no encontrado' });
      }
      res.json({ message: 'Servicio terrestre actualizado correctamente' });
    }
  );
});

// Eliminar un servicio terrestre por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM ServiciosTerrestres WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar servicio terrestre:', err);
      return res.status(500).json({ error: 'Error al eliminar servicio terrestre' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Servicio terrestre no encontrado' });
    }
    res.json({ message: 'Servicio terrestre eliminado correctamente' });
  });
});

module.exports = router;
