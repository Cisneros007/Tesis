const express = require('express');
const router = express.Router();
const db = require('../db');  

// Obtener todas las encomiendas
router.get('/', (req, res) => {
  db.query('SELECT * FROM encomiendas', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Crear una nueva encomienda
router.post('/', (req, res) => {
  const { 
    remitenteNombre, 
    remitenteTelefono, 
    destinatarioNombre, 
    destinatarioTelefono, 
    paqueteDescripcion, 
    paquetePeso, 
    paqueteValor, 
    servicioDomicilio, 
    costoServicioDomicilio 
  } = req.body;

  db.query(
    'INSERT INTO encomiendas (remitenteNombre, remitenteTelefono, destinatarioNombre, destinatarioTelefono, paqueteDescripcion, paquetePeso, paqueteValor, servicioDomicilio, costoServicioDomicilio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      remitenteNombre, 
      remitenteTelefono, 
      destinatarioNombre, 
      destinatarioTelefono, 
      paqueteDescripcion, 
      paquetePeso, 
      paqueteValor, 
      servicioDomicilio, 
      costoServicioDomicilio
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId });
    }
  );
});

// Actualizar una encomienda por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { 
    remitenteNombre, 
    remitenteTelefono, 
    destinatarioNombre, 
    destinatarioTelefono, 
    paqueteDescripcion, 
    paquetePeso, 
    paqueteValor, 
    servicioDomicilio, 
    costoServicioDomicilio 
  } = req.body;

  db.query(
    'UPDATE encomiendas SET remitenteNombre = ?, remitenteTelefono = ?, destinatarioNombre = ?, destinatarioTelefono = ?, paqueteDescripcion = ?, paquetePeso = ?, paqueteValor = ?, servicioDomicilio = ?, costoServicioDomicilio = ? WHERE idEncomienda = ?',
    [
      remitenteNombre, 
      remitenteTelefono, 
      destinatarioNombre, 
      destinatarioTelefono, 
      paqueteDescripcion, 
      paquetePeso, 
      paqueteValor, 
      servicioDomicilio, 
      costoServicioDomicilio,
      id
    ],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Encomienda actualizada correctamente' });
    }
  );
});

// Eliminar una encomienda por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM encomiendas WHERE idEncomienda = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Encomienda eliminada correctamente' });
  });
});

module.exports = router;
