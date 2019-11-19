const express = require('express');
const vacationFunctions = require('../controller/vacation.controller');
const router = express.Router();
const vacation = require('../controller/vacation.controller');

//routes
router.get('/vacation',vacationFunctions.getVacations);
router.get('/vacation/user/:id', vacationFunctions.getUserVacations);
router.post('/vacation/user/:id', vacationFunctions.createUserVacations);
router.post('/vacation/user/update/:id',vacationFunctions.updateVacations);
router.delete('/vacation/user/:id', vacationFunctions.deleteVacations);


module.exports = router;
