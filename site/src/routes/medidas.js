var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/kpiSetor/:fkShopping", function (req,res){
        let fkShopping = req.params.fkShopping;

        medidaController.kpiSetor(req, res, +fkShopping);
});

router.get("/kpiSemana/:fkShopping", function (req,res){
    let fkShopping = req.params.fkShopping;
    medidaController.pegarDiaSemana(req, res, +fkShopping);

});

router.get("/kpiMes/:fkShopping", function (req,res){
    let fkShopping = req.params.fkShopping;
    medidaController.pegarMes(req, res, +fkShopping);

});

router.get("/graficoLinha/:fkShopping/:horario", function (req, res){
    let fkShopping = req.params.fkShopping;
    let horario = String(new Date(req.params.horario));

    medidaController.graficoLinha(req, res, +fkShopping, +horario);
});

router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
    
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
});

module.exports = router;