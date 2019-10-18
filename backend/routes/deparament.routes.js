const express = require('express');
const userFunctions = require('../controller/Jornada.controller');
const router = express.Router();
const jornada = require('../controller/jornada.controller');

//routes
router.get('/departamentos',jornada.getJornadas);
router.get('/departamentos/:id', jornada.getJornadaById);
router.post('/departamentos', jornada.addJornada);
router.put('/departamentos', jornada.updateJornada);
router.delete('/departamentos/:id', jornada.deleteJornada);


module.exports = router;
