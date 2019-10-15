const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema({
    nombre: {
        type: String,
        required: true
    },
    gestor: {
        type: Schema.Types.ObjectId, 
        ref: 'Users'
    }
});