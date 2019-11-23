const mongoose = require("mongoose");
const Departamento = require("../models/Department");
const User = require("../models/users");

const departamentFunctions = {};

departamentFunctions.getDeparamentos = async (req, res, next) => {
	const deparamentos = await Departamento.find();
	res.json(deparamentos);
};

departamentFunctions.getDepartamentoById = async (req, res, next) => {
	const deparamentos = await Departamento.findById(req.params.id).catch(err =>
		console.error(err)
	);
	if (deparamentos) res.status(200).json(deparamentos);
	else res.status(404).json("Not Found");
};

departamentFunctions.createDepartamento = async (req, res, next) => {
	const deparamento = new Departamento({
		usuarios: req.body.usuarios, // los usuarios se añaden posteriormente en otra peticion req.body.usuarios,
		responsable: req.body.responsable, //el gestor se añade posteriormente en otra peticion  req.body.gestor,
		nombre: req.body.nombre
	});
	deparamento.save().then(() => res.json({ status: "Departamento saved" }));
};

departamentFunctions.updateDepartamento = async (req, res, next) => {
	var users = [];

	req.body.users.forEach(element => {
		users.push(element._id);
	});

	const departamento = {
		usuarios: req.body.users,
		responsable: req.body.responsable,
		nombre: req.body.nombre
	};
	Departamento.findByIdAndUpdate(req.body.id, departamento, {
		upsert: true,
		new: true
	})
		.then(result => {
			result.responsable = departamento.responsable;
			result.usuarios = departamento.usuarios;
			result.save();

			User.findByIdAndUpdate(
				departamento.responsable,
				{ $set: { gestor: true } },
				{}
			).then(() => {
				res.status(200);
				res.json({ status: "Departamento saved" });
			});
		})
		.catch(err => {
			res.status(400);
			res.send("Bad request\n " + err);
		});
};

departamentFunctions.deleteDepartamento = async (req, res, next) => {
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

departamentFunctions.getDepartamentoByUser = async (req, res, next) => {
	var departamentoget = await Departamento.find({
		usuarios: mongoose.Types.ObjectId(req.params.usuarios)
	}).catch(err => console.error(err));
	res.status(200);
	res.json(departamentoget);
};

departamentFunctions.getDepartamentoByGestor = async (req, res, next) => {
	var departamentoget = await Departamento.findOne({
		responsable: mongoose.Types.ObjectId(req.params.responsable)
	}).catch(err => console.error(err));
	res.status(200);
	res.json(departamentoget);
};

module.exports = departamentFunctions;
