// controllers/fechaDeclaracionController.js
const moment = require('moment');
const Estudiante = require('../models/estudiante');

const calcularFechaDeclaracion = async (req, res) => {
    try {
        const carnet = req.params.carnet;

        const estudiante = await Estudiante.findOne({ carnet });

        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        // Calcular la fecha de declaración basada en las condiciones
        let fechaDeclaracion;

        const lastCharacter = carnet[carnet.length - 1];
        const generoPoesia = estudiante.generoPoesia;

        if (lastCharacter === '1' && generoPoesia === 'dramática') {
            fechaDeclaracion = moment().add(5, 'days').endOf('day');
        } else if (lastCharacter === '3' && generoPoesia === 'épica') {
            fechaDeclaracion = moment().endOf('month').endOf('day');
        } else {
            fechaDeclaracion = moment().day('Friday').add(1, 'week').endOf('day');
        }

        estudiante.fechaDeclaracion = fechaDeclaracion;
        await estudiante.save();

        res.status(200).json({ message: 'Fecha de declaración calculada y actualizada' });
    } catch (error) {
        console.error('Error al calcular la fecha de declaración', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    calcularFechaDeclaracion
};
