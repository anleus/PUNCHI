import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Users = new Schema({
    title: {
        type: String
    },
    apellidos: {
        type: String
    },
    fechaNacimiento: {
        type: Date
    },
    email: {
        type: String
    },
    localidad: {
        type: String
    },
    provincia: {
        type: String
    },
    domicilio: {
        type: String
    },
    telefono: {
        type: Number
    },
    gestor: {
        type: Boolean
    },
    admin: {
        type: Boolean
    },
    nuss: {
        type: Number
    },
    deleted: {
        type: Boolean
    }
});
export default mongoose.model('Users', Users);