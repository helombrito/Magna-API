var express = require("express");
var router = express.Router();


var setorController = require("../controllers/setorController");


router.get("/", function (req, res) {
    console.log('Rodando...');
});

router.get("/listar", function (req, res) {
    setorController.pegarTodosSetores(req, res);
});

router.get("/listar/:id", function (req, res) {
    setorController.pegarSetorId(req, res);
});

router.post("/cadastrar", function (req, res) {

    setorController.inserirSetor(req, res);
});



module.exports = router;