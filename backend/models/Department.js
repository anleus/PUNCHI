const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Departamento = new Schema({
    nombre: {
        type: String,
        required: true
    },
    gestor: {
        type: Schema.Types.ObjectId, 
        ref: 'Users'
    },
    users:{
        type:[Schema.Types.ObjectId],
        required: 'true',
        ref: 'Users'
    }
});

module.exports = mongoose.model('Deparamento', Departamento, 'Departamento');