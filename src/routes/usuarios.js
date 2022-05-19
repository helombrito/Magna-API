var express = require("express");
var router = express.Router();


var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});
router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

router.post("/cadastrar_usuario", function (req, res) {
    usuarioController.cadastrar_usuario(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/validar", function (req, res) {
    usuarioController.validar(req, res);
});

router.post("/enviar_email", function (req) {
    usuarioController.enviar_email(req);
});

router.post("/trocarSenha", function (req) {
    usuarioController.trocarSenha(req);
});




module.exports = router;