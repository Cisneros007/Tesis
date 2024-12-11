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
router.put('/envios/:id', (req, res) => {
  const { id } = req.params;
  const { destino, fechaEnvio, estado, peso } = req.body;

  // Verificar que el ID sea válido
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'ID de envío no válido' });
  }

  // Verifica que todos los campos obligatorios estén presentes
  if (!destino || !fechaEnvio || !estado || !peso) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta para actualizar el envío en la base de datos
  db.query(
    'UPDATE Envíos SET destino = ?, fechaEnvio = ?, estado = ?, peso = ? WHERE id = ?',
    [destino, fechaEnvio, estado, peso, id],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar el envío:', err);
        return res.status(500).json({ error: 'Error al actualizar el envío' });
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
