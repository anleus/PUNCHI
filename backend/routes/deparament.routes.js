const express = require("express");
const departamento = require("../controller/departamento.controller");
const router = express.Router();

//routes
router.get("/departamentos", departamento.getDeparamentos);
router.get("/departamentos/:id", departamento.getDepartamentoById);
router.post("/departamentos", departamento.createDepartamento);
router.put("/departamentos", departamento.createDepartamento);
router.delete("/departamentos/:id", departamento.deleteDepartamento);

module.exports = router;
