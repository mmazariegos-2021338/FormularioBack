const express = require('express');
const router = express.Router();
const fechaDeclaracionController = require('../controllers/fechaDeclaracionController');

router.post('/calcular/:carnet', fechaDeclaracionController.calcularFechaDeclaracion);

module.exports = router;
