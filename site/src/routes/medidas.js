var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/kpiSetor", function (req,res){
    medidaController.kpiSetor(req, res);
});
router.get("/kpiSemana", function (req,res){
    medidaController.kpiSetor(req, res);
});
router.get("/kpiMes", function (req,res){
    medidaController.kpiSetor(req, res);
});
router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
});

module.exports = router;