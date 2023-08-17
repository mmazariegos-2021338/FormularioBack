// controllers/estudiantesController.js
const moment = require('moment');
const { validationResult } = require('express-validator');
const Estudiante = require('../models/estudiante');
const { request, response } = require("express");


const inscripcion = async (req = request, res = response) => {
    try {
        
      
        // Resto del código de la función inscripcion
        const { carnet, nombre, direccion, genero, telefono, fechaNacimiento, carrera, generoPoesia } = req.body;

        // Crear instancia del modelo Estudiante
        const estudiante = new Estudiante({
            carnet,
            nombre,
            direccion,
            genero,
            telefono,
            fechaNacimiento,
            carrera,
            generoPoesia
        });

        // Calcular la fecha de declaración basada en las condiciones
        let fechaDeclaracion;

        const lastCharacter = carnet[carnet.length - 1];

        if (lastCharacter === '1' && generoPoesia === 'dramática') {
            fechaDeclaracion = moment().add(5, 'days').endOf('day');
        } else if (lastCharacter === '3' && generoPoesia === 'épica') {
            fechaDeclaracion = moment().endOf('month').endOf('day');
        } else {
            fechaDeclaracion = moment().day('Friday').add(1, 'week').endOf('day');
        }

        // Asignar la fecha de declaración al estudiante
        estudiante.fechaDeclaracion = fechaDeclaracion;

        // Guardar el estudiante en la base de datos
        await estudiante.save();

        res.status(201).json({ message: 'Inscripción exitosa' });
    } catch (error) {
        console.error('Error al realizar la inscripción', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    inscripcion
};
