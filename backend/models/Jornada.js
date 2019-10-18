const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Jornada = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        require: true
    },
    begin: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Jornada', Jornada, 'JornadaLaboral');