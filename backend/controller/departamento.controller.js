const mongoose = require("mongoose");
const Departamento = require("../models/Department");

const departamentFunctions = {};

departamentFunctions.getDeparamentos = async (req, res, next) => {
	const deparamentos = await Departamento.find();
	res.json(deparamentos);
};

departamentFunctions.getDepartamentoById = async (req, res, next) => {
	const deparamentos = await Departamento.findById(req.params.id).catch(err =>
		console.log(err)
	);
	if (deparamentos) res.status(200).json(deparamentos);
	else res.status(404).json("Not Found");
};

departamentFunctions.createDepartamento = async (req, res, next) => {
	console.log(req.body)
	const deparamento = new Departamento({
		usuarios:  req.body.usuarios, // los usuarios se añaden posteriormente en otra peticion req.body.usuarios,
		gestor: null, //el gestor se añade posteriormente en otra peticion  req.body.gestor,
		nombre: req.body.nombre
	});
	deparamento.save().then(() => res.json({ status: "Departamento saved" }));
};

departamentFunctions.updateDepartamento = async (req, res, next) => {
	const deparamento = new Departamento({
		users: req.body.users,
		gestor: req.body.gestor,
		nombre: req.body.nombre
	});
	Departamento.findByIdAndUpdate(
		req.body.id,
		{ $set: deparamento },
		{ new: true }
	)
		.then(() => {
			res.status(200);
			res.send("Deparamento updated");
		})
		.catch(err => {
			res.status(400);
			res.send("Bad request");
		});
};

departamentFunctions.deleteDepartamento = async (req, res, next) => {
	console.log(req)
	await Departamento.findByIdAndRemove(req.params.id)

		.then(() => {
			res.status(200);
			res.json({ status: "Deparamento deleted" });
		})
		.catch(() => {
			res.status(500);
			res.send("Request cannot be fullfilled");
		});
};

module.exports = departamentFunctions;
