const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Departamento = new Schema({
	nombre: {
		type: String,
		required: true
	},
	gestor: {
		type: Schema.Types.ObjectId,
		ref: "Users"
	},
	usuarios: {
		type: [Schema.Types.String], //ESTO ESTA CAMBIADO PARA PRUEBAS!!!
		ref: "Users"
	}
});

module.exports = mongoose.model("Deparamento", Departamento, "Departamento");
