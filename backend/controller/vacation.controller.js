const Vacation = require('../models/Vacation');

const vacationFunctions = {}

vacationFunctions.getVacations = async (req, res, next) => {
    Vacation.find().then(docs => res.json(docs)).catch(err => {console.log(res); res.status('400').send('An error ocurred')})
}

module.exports = vacationFunctions;

