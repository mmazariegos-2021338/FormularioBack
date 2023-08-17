
const express = require('express');
const router = express.Router();
const Estudiante = require('../models/estudiante');
// Importa el controlador y otros módulos necesarios
const estudiantesController = require('../controller/estudiantesController');
const validarCampos = require('../middlewares/validarCampos');


// Define las rutas y sus manejadores de controladores
router.post('/inscripcion' , validarCampos, estudiantesController.inscripcion);
// ... otras rutas

module.exports = router;
