const Incidencia = require("../models/Incidencia");
const Mongoose = require("mongoose");

const incidenciaFunctions = {};

incidenciaFunctions.getIncidencias = async (req, res, next) => {
  try {
    const incidencias = await Incidencia.find();
    res.json(incidencias);
  } catch (err) {
    console.log(err);
  }
};

incidenciaFunctions.getUserIncidencias = async (req, res, next) => {
  Incidencia.find({ id_user: Mongoose.Types.ObjectId(req.params.id) })
    .then(docs => res.json(docs))
    .catch(err => {
      console.log(err);
      res.status("400").send("An error ocurred");
    });
};

incidenciaFunctions.createUserIncidencia = async (req, res, next) => {
  console.log("Back crear incidencia");

  console.log(req.body.asunto)
  //console.log(req)
  const incidencia = new Incidencia({
    id_user: req.body.id_user,
    asunto: req.body.asunto,
    vacaciones: req.body.vacaciones,
    incidencias: req.body.incidencias,
    mensaje: req.body.mensaje,
    estado: req.body.estado
  });

  //console.log(incidencia)
 incidencia.save()
    .then(res.status("200").json("Incidencia saved"))
    .catch(err => {
      console.log(err);
      res.status("400").json("An error ocurred");
    });
};

incidenciaFunctions.updateIncidencias = async (req, res, next) => {
  const incidencia = new Incidencia({
    _id: req.body._id,
    id_user: req.body.id_user,
    vacaciones: req.body.vacaciones,
    incidencias: req.body.incidencias,
    mensaje: req.body.mensaje,
    estado: req.body.estado
  });
  Incidencia.findByIdAndUpdate(req.params.id, { $set: incidencia })
    .then(res.status(200).json("Incidencia updated"))
    .catch(err => {
      console.log(err);
      res.status(400).send("An error ocurred");
    });
};

incidenciaFunctions.deleteIncidencias = async (req, res, next) => {
  Incidencia.findByIdAndDelete(req.body.id)
    .then(() => {
      res.status(200);
      res.json({ status: "Incidencia deleted" });
    })
    .catch(() => {
      res.status(500);
      res.send("An error ocurred");
    });
};

module.exports = incidenciaFunctions;
