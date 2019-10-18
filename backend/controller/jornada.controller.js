const mongoose = require('mongoose');
const Jornada = require('../models/Jornada');

const jornadaFunctions = {}

jornadaFunctions.getJornadas = async (req, res, next) => {
    const jornadas = await Jornada.find();
    res.json(jornadas);
}

jornadaFunctions.getJornadaById = async (req, res, next) => {
    const jornada = await Jornada.findById(req.params.id).catch(err => console.log(err));
    if(jornada)
        res.status(200).json(jornada);
    else
        res.status(404).json('Not Found');
}

jornadaFunctions.addJornada = async (req, res, next) => {
    console.log('aqui tamos');
    const jornada = new Jornada({
        user: req.params.userid,
        begin: req.params.begin,
        end: Date.now()
    })
    jornada.save()
        .then(() => res.json({status: 'Jornada saved'}))
}

jornadaFunctions.updateJornada = async (req, res, next) => {
    const jornada = new Jornada({
        user: req.params.userid,
        begin: req.params.begin,
        end: Date.now()
    })
    Jornada.findByIdAndUpdate(req.params.id, {$set: jornada}, {new: true})
        .then(() => {
            res.status(200); 
            res.send("Jornada updated")})
        .catch((err) => {
            res.status(400);
            res.send("Bad request");});
};

jornadaFunctions.deleteJornada = async (req, res, next) => {
    await Jornada.findByIdAndRemove(req.params.id)
    .then(() => {
        res.status(200);
        res.json({status: 'Jornada deleted'})})
    .catch(() => {
        res.status(500);
        res.send("Request cannot be fullfilled")});
};

module.exports = jornadaFunctions;