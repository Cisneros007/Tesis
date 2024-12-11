const express = require('express');
const router = express.Router();
const db = require('../db'); // Conexión a la base de datos

// Ruta para verificar código y contraseña
router.post('/check', (req, res) => {
  const { codigo, contraseña } = req.body;

  if (!codigo || !contraseña) {
    return res.status(400).json({ error: 'Código y contraseña son obligatorios' });
  }

  db.query(
    'SELECT * FROM Tracking WHERE codigo = ? AND contraseña = ?',
    [codigo, contraseña],
    (err, results) => {
      if (err) {
        console.error('Error al obtener el tracking:', err);
        return res.status(500).json({ error: 'Error al obtener la información del tracking' });
      }

      if (results.length > 0) {
        return res.json(results[0]); // Devuelve el primer resultado
      } else {
        return res.status(404).json({ error: 'No se encontró tracking con este código o contraseña' });
      }
    }
  );
});

// Ruta para obtener todos los trackings
router.get('/', (req, res) => {
  db.query('SELECT * FROM Tracking', (err, results) => {
    if (err) {
      console.error('Error al obtener los trackings:', err);
      return res.status(500).json({ error: 'Error al obtener los trackings' });
    }

    res.json(results); // Devuelve todos los trackings
  });
});
// Agregar un registro de seguimiento
router.post('/tracking', async (req, res) => {
  try {
    const tracking = await Tracking.create(req.body);
    res.status(201).json(tracking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener seguimiento por encomienda
router.get('/tracking/:idEncomienda', async (req, res) => {
  try {
    const tracking = await Tracking.findAll({
      where: { idEncomienda: req.params.idEncomienda },
    });
    res.json(tracking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
