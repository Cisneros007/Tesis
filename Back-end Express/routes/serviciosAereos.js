// routes/serviciosAereos.js
const express = require('express');
const router = express.Router();
const db = require('../db');  // Importa la conexión a la base de datos

// Obtener todos los servicios aéreos
router.get('/', (req, res) => {
  db.query('SELECT * FROM ServiciosAereos', (err, results) => {
    if (err) {
      console.error('Error al obtener servicios aéreos:', err);
      return res.status(500).json({ error: 'Error al obtener servicios aéreos' });
    }
    res.json(results);
  });
});

// Crear un nuevo servicio aéreo
router.post('/', (req, res) => {
  const { nombre, descripcion } = req.body;

  // Verifica que todos los campos obligatorios estén presentes
  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  db.query(
    'INSERT INTO ServiciosAereos (nombre, descripcion) VALUES (?, ?)',
    [nombre, descripcion],
    (err, result) => {
      if (err) {
        console.error('Error al crear servicio aéreo:', err);
        return res.status(500).json({ error: 'Error al crear servicio aéreo' });
      }
      res.status(201).json({ id: result.insertId, message: 'Servicio aéreo creado exitosamente' });
    }
  );
});

// Actualizar un servicio aéreo por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  // Verifica que todos los campos obligatorios estén presentes
  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  db.query(
    'UPDATE ServiciosAereos SET nombre = ?, descripcion = ? WHERE id = ?',
    [nombre, descripcion, id],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar servicio aéreo:', err);
        return res.status(500).json({ error: 'Error al actualizar servicio aéreo' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Servicio aéreo no encontrado' });
      }
      res.json({ message: 'Servicio aéreo actualizado correctamente' });
    }
  );
});

// Eliminar un servicio aéreo por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM ServiciosAereos WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar servicio aéreo:', err);
      return res.status(500).json({ error: 'Error al eliminar servicio aéreo' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Servicio aéreo no encontrado' });
    }
    res.json({ message: 'Servicio aéreo eliminado correctamente' });
  });
});

module.exports = router;
