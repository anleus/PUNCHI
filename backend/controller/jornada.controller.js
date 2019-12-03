const mongoose = require('mongoose');
const Jornada = require('../models/Jornada');

const jornadaFunctions = {};

jornadaFunctions.getJornadas = async (req, res, next) => {
  const jornadas = await Jornada.find();
  res.json(jornadas);
};

jornadaFunctions.getJornadaByUserId = async (req, res, next) => {
  const jornadas = await Jornada.find({
    user: req.params.id,
  }).sort({ begin: -1 });
  if (!jornadas) res.status(500).json('Not Found');
  else res.status(200).json(jornadas);
};

jornadaFunctions.addJornada = async (req, res, next) => {
  const jornada = new Jornada({
    user: req.body.user,
    begin: req.body.begin,
    end: req.body.end,
  });
  jornada.save().then(() => res.json({ status: 'Jornada saved' }));
};

jornadaFunctions.updateJornada = async (req, res, next) => {
  const jornada = new Jornada({
    user: req.body.userid,
    begin: req.body.begin,
    end: Date.now(),
  });
  Jornada.findByIdAndUpdate(req.body.id, { $set: jornada }, { new: true })
    .then(() => {
      res.status(200);
      res.send('Jornada updated');
    })
    .catch((err) => {
      res.status(400);
      res.send('Bad request');
    });
};

jornadaFunctions.deleteJornada = async (req, res, next) => {
  await Jornada.findByIdAndRemove(req.body.id)
    .then(() => {
      res.status(200);
      res.json({ status: 'Jornada deleted' });
    })
    .catch(() => {
      res.status(500);
      res.send('Request cannot be fullfilled');
    });
};

jornadaFunctions.getJornadasForCSV = async (req, res, next) => {
  Jornada.find({
    begin: { $gte: new Date(2012, 7, 14), $lt: new Date(2012, 7, 15) },
    end: { $gte: new Date(2012, 12, 5), $lt: new Date(2012, 12, 5) },
    user: req.params.id,
	});  
}

module.exports = jornadaFunctions;
