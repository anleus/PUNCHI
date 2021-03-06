const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = Schema({
    nombre: {
        type: String,
         required: true 
    },
    apellidos: {
        type: String,
        required: true 
    },
    fechaNacimiento: {
        type: Date,
        required: true 
    },
    email: {
        type: String,
        required: true 
    },
    localidad: {
        type: String,
        required: true 
    },
    provincia: {
        type: String,
        required: true 
    },
    domicilio: {
        type: String,
        required: true 
    },
    telefono: {
        type: Number,
        required: true 
    },
    gestor: {
        type: Boolean,
        required: true 
    },
    admin: {
        type: Boolean,
        required: true 
    },
    nuss: {
        type: Number
    },
    deleted: {
        type: Boolean //*
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    becario: {
        type: Boolean,
        required: true
    }
});
    //}, {collection: 'User'});

module.exports = mongoose.model('Users', Users, 'Users');