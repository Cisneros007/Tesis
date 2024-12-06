// routes/trackingRoutes.js
const express = require('express');
const router = express.Router();

const db = require('../db'); 



// Get all tracking records
router.get('/', async (req, res) => {
  try {
    const trackings = await Tracking.findAll();
    res.json(trackings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a tracking record by ID
router.get('/:id', async (req, res) => {
  try {
    const tracking = await Tracking.findByPk(req.params.id);
    if (tracking) {
      res.json(tracking);
    } else {
      res.status(404).json({ message: 'Tracking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new tracking record
router.post('/', async (req, res) => {
  try {
    const { idEncomienda, ubicacionActual, latitud, longitud, estado } = req.body;
    const newTracking = await Tracking.create({ idEncomienda, ubicacionActual, latitud, longitud, estado });
    res.status(201).json(newTracking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing tracking record
router.put('/:id', async (req, res) => {
  try {
    const { idEncomienda, ubicacionActual, latitud, longitud, estado } = req.body;
    const tracking = await Tracking.findByPk(req.params.id);
    if (tracking) {
      tracking.idEncomienda = idEncomienda;
      tracking.ubicacionActual = ubicacionActual;
      tracking.latitud = latitud;
      tracking.longitud = longitud;
      tracking.estado = estado;
      await tracking.save();
      res.json(tracking);
    } else {
      res.status(404).json({ message: 'Tracking not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a tracking record
router.delete('/:id', async (req, res) => {
  try {
    const tracking = await Tracking.findByPk(req.params.id);
    if (tracking) {
      await tracking.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Tracking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
