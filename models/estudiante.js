const { Schema, model } = require('mongoose');


const EstudianteSchema = new Schema({
    carnet: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        enum: ['masculino', 'femenino'],
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    carrera: {
        type: String,
        required: true
    },
    generoPoesia: {
        type: String,
        enum: ['lírica', 'épica', 'dramática'],
        required: true
    },
    fechaInscripcion: {
        type: Date,
        default: Date.now
    },
    fechaDeclaracion: {
        type: Date
    }
});

module.exports = model('Estudiante', EstudianteSchema);
