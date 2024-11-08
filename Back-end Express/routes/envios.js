const express = require('express');
const router = express.Router();
const db = require('../db');  // Importa la conexión a la base de datos

// Obtener todos los envíos
router.get('/', (req, res) => {
  db.query('SELECT * FROM Envios', (err, results) => {
    if (err) {
      console.error('Error al obtener envíos:', err);
      return res.status(500).json({ error: 'Error al obtener envíos' });
    }
    res.json(results);
  });
});

// Crear un nuevo envío
router.post('/', (req, res) => {
  const { envio, fechaEnvio, horaEnvio, estado } = req.body;

  // Verifica que todos los campos obligatorios estén presentes
  if (!envio || !fechaEnvio || !horaEnvio || !estado) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  db.query(
    'INSERT INTO Envios (envio, fechaEnvio, horaEnvio, estado) VALUES (?, ?, ?, ?)',
    [envio, fechaEnvio, horaEnvio, estado],
    (err, result) => {
      if (err) {
        console.error('Error al crear envío:', err);
        return res.status(500).json({ error: 'Error al crear envío' });
      }
      res.status(201).json({ id: result.insertId, message: 'Envío creado exitosamente' });
    }
  );
});

// Actualizar un envío por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { envio, fechaEnvio, horaEnvio, estado } = req.body;

  // Verifica que todos los campos obligatorios estén presentes
  if (!envio || !fechaEnvio || !horaEnvio || !estado) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  db.query(
    'UPDATE Envios SET envio = ?, fechaEnvio = ?, horaEnvio = ?, estado = ? WHERE id = ?',
    [envio, fechaEnvio, horaEnvio, estado, id],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar envío:', err);
        return res.status(500).json({ error: 'Error al actualizar envío' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Envío no encontrado' });
      }
      res.json({ message: 'Envío actualizado correctamente' });
    }
  );
});

// Eliminar un envío por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Envios WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar envío:', err);
      return res.status(500).json({ error: 'Error al eliminar envío' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Envío no encontrado' });
    }
    res.json({ message: 'Envío eliminado correctamente' });
  });
});

module.exports = router;
