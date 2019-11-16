const Vacation = require('../models/Incidencia');
const Mongoose = require('mongoose');

const incidenciaFunctions = {};


incidenciaFunctions.getIncidencias = async (req, res, next) => {
    Vacation.find().then(docs => res.json(docs)).catch(err => {console.log(err); res.status('400').send('An error ocurred')})
}


incidenciaFunctions.getUserIncicencias = async (req, res, next) => {
    Incidencia.find({user: Mongoose.Types.ObjectId(req.params.id)}).then(docs => res.json(docs)).catch(err => {console.log(err); res.status('400').send('An error ocurred')})
}


incidenciaFunctions.createUserIncidencia = async (req, res, next) => {
    const incicencia = new Incidencia({
        id_user: req.body.id_user,
        vacaciones: req.body.vacaciones,
        incidencias: req.body.incidencias,
        mensaje: req.body.mensaje,
        estado: req.body.estado
    });
    incicencia.save().then(res.status('200').json('Incidencia saved')).catch(err => {console.log(err); res.status('400').json('An error ocurred')});
}

incidenciaFunctions.updateIncidencias = async (req, res, next) => {
    const incidencia = new Incidencia({
        id_user: req.body.id_user,
        vacaciones: req.body.vacaciones,
        incidencias: req.body.incidencias,
        mensaje: req.body.mensaje,
        estado: req.body.estado
    });
    Incidencia.findByIdAndUpdate(req.body.id,{$set: incidencia}).then(res.status(200).json('Incidencia updated')).catch(err => {console.log(err);res.status(400).send('An error ocurred')});
}
//*************************** */
incidenciaFunctions.deleteIncidencias = async(req, res, next) => {
    Incidencia.findByIdAndDelete(req.body.id).then(() => {
        res.status(200);
        res.json({ status: "Incidencia deleted" });
    })
    .catch(() => {
        res.status(500);
        res.send("An error ocurred");
    });
}


module.exports = incidenciaFunctions;