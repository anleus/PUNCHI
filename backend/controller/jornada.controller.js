const mongoose = require("mongoose");
const Jornada = require("../models/Jornada");

const jornadaFunctions = {};

jornadaFunctions.getJornadas = async (req, res, next) => {
	const jornadas = await Jornada.find();
	res.json(jornadas);
};

jornadaFunctions.getJornadaByPeriodAndUserId = async (req, res, next) => {
	let userid = req.body.id;
	let initDate = req.body.initDate;
	let endDate = req.body.endDate;

	//let today = new Date();
	//let month = req.params.month || today.getMonth();
	//let firstDay = new Date(today.getFullYear, month, 1);
	//let lastDay = new Date(today.getFullYear, month, 1);

	console.log(req.body);

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
    begin: { $gte: req.params.inicio },
    end: { $lt: req.params.fin },
    user: req.params.id,
  })
  .then((jornadas) => {
	  console.log(jornadas);
    jorn = []
	var mapa = {}
	var user;
    jornadas.forEach(elem => {
		console.log('inside ' + elem);
    
		//inicio = new Date(elem.begin)
		user = elem.user
      	dia = elem.begin.getDay()
      	mes = elem.begin.getMonth()+1
      	anyo = elem.begin.getFullYear()
      	fecha = elem.begin.getFullYear() + "/" + (elem.begin.getMonth()+1) + "/" + elem.begin.getDay()
      	difH = elem.end.getTime() - elem.begin.getTime();
      
      	anterior = mapa[fecha] ? mapa[fecha] : 0;
      	mapa[fecha]= (difH + anterior)
	}) 
	Object.keys(mapa).forEach((v)=>{
		console.log('key: ' + v + ' value ' + mapa[v]);
        jorn.push(new Array(user, v,  mapa[v]))  
	})
     
    res.json(jorn);
  })
  .catch(err => {
	  console.log("no va :)")
    console.log(err)
  });  
}

module.exports = jornadaFunctions;
