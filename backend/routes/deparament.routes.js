const express = require("express");
const departamento = require("../controller/departamento.controller");
const router = express.Router();

//routes
router.get("/departamentos", departamento.getDeparamentos);
router.get("/departamentos/:id", departamento.getDepartamentoById);
router.post("/departamentos", departamento.createDepartamento);
router.put("/departamentos", departamento.createDepartamento);
router.get("/departamentos/usuarios/:usuarios", departamento.getDepartamentoByUser);
router.get("/departamentos/responsable/:responsable", departamento.getDepartamentoByGestor);
router.delete("/departamentos/:id", departamento.deleteDepartamento);

module.exports = router;
