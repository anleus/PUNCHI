const mongoose = require("mongoose");
const Jornada = require("../models/Jornada");

const jornadaFunctions = {};

jornadaFunctions.getJornadas = async (req, res, next) => {
	const jornadas = await Jornada.find();
	res.json(jornadas);
};

jornadaFunctions.getJornadaByMonthAndUserId = async (req, res, next) => {
	let userid = req.params.id;
	let initDate = req.params.initDate;
	let endDate = req.params.endDate;

	//let today = new Date();
	//let month = req.params.month || today.getMonth();
	//let firstDay = new Date(today.getFullYear, month, 1);
	//let lastDay = new Date(today.getFullYear, month, 1);

	const jornadas = await Jornada.find({
		user: userid,
		begin: { $gte: new Date(initDate) },
		end: { $lt: new Date(endDate) }
	});
	res.status(200).json(jornadas);
};

jornadaFunctions.getJornadaByUserId = async (req, res, next) => {
	const jornadas = await Jornada.find({
		user: req.params.id
	}).sort({ begin: -1 });
	if (!jornadas) res.status(500).json("Not Found");
	else res.status(200).json(jornadas);
};

jornadaFunctions.addJornada = async (req, res, next) => {
	const jornada = new Jornada({
		user: req.body.user,
		begin: req.body.begin,
		end: req.body.end
	});
	jornada.save().then(() => res.json({ status: "Jornada saved" }));
};

jornadaFunctions.updateJornada = async (req, res, next) => {
	const jornada = new Jornada({
		user: req.body.userid,
		begin: req.body.begin,
		end: Date.now()
	});
	Jornada.findByIdAndUpdate(req.body.id, { $set: jornada }, { new: true })
		.then(() => {
			res.status(200);
			res.send("Jornada updated");
		})
		.catch(err => {
			res.status(400);
			res.send("Bad request");
		});
};

jornadaFunctions.deleteJornada = async (req, res, next) => {
	await Jornada.findByIdAndRemove(req.body.id)
		.then(() => {
			res.status(200);
			res.json({ status: "Jornada deleted" });
		})
		.catch(() => {
			res.status(500);
			res.send("Request cannot be fullfilled");
		});
};

jornadaFunctions.getJornadasForCSV = async (req, res, next) => {
  Jornada.find({
    begin: { $gte: req.params.begin },
    end: { $lt: req.params.end },
    user: req.params.id,
  })
  .then((jornadas) => {
    jorn = []
    mapa = new Map()
    jornadas.forEach(elem => {
      inicio = new Date(elem.values.begin)
      dia = inicio.getDay()
      mes = inicio.getMonth()+1
      anyo = inicio.getFullYear()
      fecha = dia +'/'+ mes +'/'+ anyo
      difH = (new Date(elem.values.end)).getTime() - (new Date(elem.values.begin)).getTime();
      
      anterior = mapa.getKey(dia) ? mapa.getKey(dia) : 0;
      mapa.setKey(dia, (difH + anterior))
      
      mapa.entries().forEach(([j,k]) => {
        jorn.push(new Array(jornadas.values.userid, k, j))
      });   
    }); 
    res.json(jorn);
  })
  .catch(() => {
    res.status(500).json("No tienes ninguna jornada registrada")
  });  
}


module.exports = jornadaFunctions;
