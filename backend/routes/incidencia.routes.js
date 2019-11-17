const express = require('express');
const incidenciaFunctions = require('../controller/incidencia.controller');
const router = express.Router();
const vacation = require('../controller/incidencia.controller');

//routes
router.get('/incidencia',incidenciaFunctions.getIncidencias);
router.get('/incidencia/user/:id', incidenciaFunctions.getUserIncicencias);
router.post('/incidencia/user/:id', incidenciaFunctions.createUserIncidencia);
router.put('/incidencia/user/:id', incidenciaFunctions.updateIncidencias);
router.delete('/incidencia/user/:id', incidenciaFunctions.deleteIncidencias);


module.exports = router;
