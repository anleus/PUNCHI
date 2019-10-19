const express = require("express");
const departamento = require("../controller/departamento.controller");
const router = express.Router();

//routes
/* router.get("/departamentos", departamento.getJornadas);
router.get("/departamentos/:id", departamento.getJornadaById); */
router.post("/departamentos", departamento.createDepartamento);
/* router.put("/departamentos", departamento.updateJornada);
router.delete("/departamentos/:id", departamento.deleteJornada); */

module.exports = router;
