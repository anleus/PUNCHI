const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Incidencia = new Schema({
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        require: true
    },
    vacaciones: {
        type: Boolean,
        required: true
    },
    incidencias: {
        type: Boolean,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    asunto: {
        type: String,
        required: true
    },
    leido: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Incidencia', Incidencia, 'Incidencia');