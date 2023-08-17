const moment = require('moment');
const { validationResult } = require("express-validator");


const validarCampos = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors});
    }

    // Aplicar validaciones adicionales
    const carnet = req.body.carnet;
    const generoPoesia = req.body.generoPoesia;
    const fechaNacimiento = req.body.fechaNacimiento;

    // La longitud del carnet será de 6 caracteres y no tendrá ceros
    if (carnet.length !== 6 || carnet.includes('0')) {
        return res.status(400).json({ message: 'El carnet no cumple con las condiciones' });
    }

    // El primer carácter deberá ser A (mayúscula o minúscula)
    if (carnet[0] !== 'A' && carnet[0] !== 'a') {
        return res.status(400).json({ message: 'El carnet no inicia con A' });
    }

    // El tercer carácter deberá ser 5
    if (carnet[2] !== '5') {
        return res.status(400).json({ message: 'El tercer carácter del carnet no es 5' });
    }

    // El último carácter deberá terminar en 1, 3 o 9
    const lastCharacter = carnet[carnet.length - 1];
    if (lastCharacter !== '1' && lastCharacter !== '3' && lastCharacter !== '9') {
        return res.status(400).json({ message: 'El último carácter del carnet no es válido' });
    }

    // Validar género de poesía
    if (generoPoesia !== 'lírica' && generoPoesia !== 'épica' && generoPoesia !== 'dramática') {
        return res.status(400).json({ message: 'Género de poesía inválido' });
    }
    
    const fechaNacimientoMoment = moment(fechaNacimiento);
    const edad = moment().diff(fechaNacimientoMoment, 'years');
    if (edad <= 17) {
        return res.status(400).json({ message: 'Debes ser mayor de 17 años para inscribirte' });
    }
    // Next sirve para continuar con el flujo si todas las validaciones pasaron
    next();
};

module.exports = validarCampos
