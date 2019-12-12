const express = require("express");
const userFunctions = require("../controller/jornada.controller");
const router = express.Router();
const jornada = require("../controller/jornada.controller");

//routes
router.get("/jornada", jornada.getJornadas);
router.get("/jornada/:id", jornada.getJornadaByUserId);
router.post("/jornada", jornada.addJornada);
router.put("/jornada", jornada.updateJornada);
router.delete("/jornada/:id", jornada.deleteJornada);
router.get("/jornada/exports/:id/:inicio/:fin", jornada.getJornadasForCSV);
router.post("/jornada/period", jornada.getJornadaByPeriodAndUserId);

module.exports = router;
