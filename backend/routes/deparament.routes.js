const express = require("express");
const userFunctions = require("../controller/departamento.controller");
const router = express.Router();
const jornada = require("../controller/departamento.controller");

//routes
/* router.get("/departamentos", departamento.getJornadas);
router.get("/departamentos/:id", departamento.getJornadaById); */
router.post("/departamentos", departamento.createDepartamento);
/* router.put("/departamentos", departamento.updateJornada);
router.delete("/departamentos/:id", departamento.deleteJornada); */

module.exports = router;
