const express = require('express');
const router = express.Router();

// Generar un pago
router.post('/pago', async (req, res) => {
  try {
    const pago = await Pago.create(req.body);
    res.status(201).json(pago);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Consultar pagos por encomienda
router.get('/pago/:idEncomienda', async (req, res) => {
  try {
    const pagos = await Pago.findAll({ where: { idEncomienda: req.params.idEncomienda } });
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
