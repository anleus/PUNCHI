const Vacation = require('../models/Vacation');
const Mongoose = require('mongoose');

const vacationFunctions = {}

vacationFunctions.getVacations = async (req, res, next) => {
    Vacation.find().then(docs => res.json(docs)).catch(err => {console.log(err); res.status('400').send('An error ocurred')})
}

vacationFunctions.getUserVacations = async (req, res, next) => {
    Vacation.find({user: Mongoose.Types.ObjectId(req.params.id)}).then(docs => res.json(docs)).catch(err => {console.log(err); res.status('400').send('An error ocurred')})
}

vacationFunctions.createUserVacations = async (req, res, next) => {//Esto solo debe ejecutarse al crear un usuario
    const vacation = new Vacation({
        user: req.body.id,
        pending: [],
        left: req.body.left
    });
    vacation.save().then(res.status('200').json('Vacation saved')).catch(err => {console.log(err); res.status('400').json('An error ocurred')});
}

vacationFunctions.updateVacations = async (req, res, next) => {
    const vacation = new Vacation({
        user: req.body.id,
        pending: [],
        left: req.body.left
    });
    Vacation.findByIdAndUpdate(req.body.id,{$set: vacation}).then(res.status(200).json('Vacation updated')).catch(err => {console.log(err);res.status(400).send('An error ocurred')});
}

vacationFunctions.deleteVacations = async(req, res, next) => {//Esto solo deberia ejecutarse si estas eliminando un usuairo
    Vacation.findByIdAndDelete(req.body.id).then(() => {
        res.status(200);
        res.json({ status: "Vacation deleted" });
    })
    .catch(() => {
        res.status(500);
        res.send("An error ocurred");
    });
}

module.exports = vacationFunctions;

