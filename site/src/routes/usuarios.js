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
  usuarioController.validarId(req, res);
});

router.post("/enviar_email", function (req, res) {
  usuarioController.enviar_email(req, res);
});

router.post("/trocarSenha/:id", function (req, res) {
  if (req.params.id !== undefined) {
    let id = req.params.id;
    usuarioController.trocarSenha(req, res, +id);
  }
});

router.put("/mudarDisponibilidade", (req, res) => {
  usuarioController.mudarDisponibilidade(req, res);
});

router.get("/listarDisponiveis", (req, res) => {
  usuarioController.pegarUsersDisponiveis(req, res);
});

router.post("/cadastrarLogin", (req, res) => {
  usuarioController.cadastrarLogin(req, res);
});

router.get("/shop/:id", (req, res) => {
  usuarioController.pegarUsuariosShopping(req, res);
});

module.exports = router;
