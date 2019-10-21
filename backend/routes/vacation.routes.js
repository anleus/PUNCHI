const express = require('express');
const vacationFunctions = require('../controller/vacation.controller');
const router = express.Router();
const vacation = require('../controller/vacation.controller');

//routes
router.get('/vacation',vacationFunctions.getVacations);



module.exports = router;
