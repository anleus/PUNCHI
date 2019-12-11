const Vacation = require('../models/Vacation');
const Mongoose = require('mongoose');

const vacationFunctions = {}

vacationFunctions.getVacations = async (req, res, next) => {
    Vacation.find().then(docs => res.json(docs)).catch(err => { console.log(err); res.status('400').send('An error ocurred') })
}

vacationFunctions.getUserVacations = async (req, res, next) => {
    Vacation.find({ user: Mongoose.Types.ObjectId(req.params.id) }).then(docs => { res.json(docs[0]) }).catch(err => { console.log(err); res.status('400').send('An error ocurred') })
}

vacationFunctions.createUserVacations = async (req, res, next) => {//Esto solo debe ejecutarse al crear un usuario
    const vacation = new Vacation({
        user: req.body.id,
        pending: [],
        left: req.body.left,
        past: req.body.past
    });
    Vacation.save().then(res.status('200').json('Vacation saved')).catch(err => { console.log(err); res.status('400').json('An error ocurred') });
}

vacationFunctions.updateVacations = async (req, res, next) => {
    Vacation.findByIdAndUpdate(req.params.id, {user: req.body.user, pending: req.body.pending, left: req.body.left, past: req.body.past }, {'new' : true, 'lean' : true, 'upsert':true}, (err, doc) => {
        if (err) console.log("Something wrong when updating data!");
        res.status(200);
        res.json({ status: "Vacation updated" });
    }).catch(err => { console.log(err); res.status('400').json('An error ocurred') });
    
}

vacationFunctions.deleteVacations = async (req, res, next) => {//Esto no deberia ejecutarse pero esta por si acaso
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

