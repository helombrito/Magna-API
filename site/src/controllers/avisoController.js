var avisoModel = require("../models/avisoModel");

function testar(req, res) {
  console.log("ENTRAMOS NO avisoController");
  res.send("ENTRAMOS NO AVISO CONTROLLER");
}

function listar(req, res) {
  avisoModel
    .listar()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function listarPorUsuario(req, res) {
  var idUsuario = req.params.idUsuario;

  avisoModel
    .listarPorUsuario(idUsuario)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function pesquisarDescricao(req, res) {
  var descricao = req.params.descricao;

  avisoModel
    .pesquisarDescricao(descricao)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function publicar(req, res) {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  var idUsuario = req.params.idUsuario;

  if (titulo == undefined) {
    res.status(400).send("O título está indefinido!");
  } else if (descricao == undefined) {
    res.status(400).send("A descrição está indefinido!");
  } else if (idUsuario == undefined) {
    res.status(403).send("O id do usuário está indefinido!");
  } else {
    avisoModel
      .publicar(titulo, descricao, idUsuario)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function editar(req, res) {
  var novaDescricao = req.body.descricao;
  var idAviso = req.params.idAviso;

  avisoModel
    .editar(novaDescricao, idAviso)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function deletar(req, res) {
  var idAviso = req.params.idAviso;

  avisoModel
    .deletar(idAviso)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

/**
 * @param {Request} req
 * @param {Response} res
 */
function listarRegistros1Minuto(req, res) {
  let id = req.params.id;
  if (id) {
    let dt1min = new Date();
    let dt = new Date();
    dt1min.setMinutes(dt.getMinutes() + 160);
    dt.setMinutes(dt.getMinutes() + 180);
    formatada1min = formatarDate(dt1min);
    formatada = formatarDate(dt);
    avisoModel
      .listarUltimoRegistro1Minuto(formatada, formatada1min, id)
      .then((val) => {
        res.json(val).status(200);
      })
      .catch((err) => res.json({ message: "error", err: err }).status(500));
  }
}
/**
 * @param {Date} data
 * @return {string}
 */
function formatarDate(data) {
  let dia = data.getDate().toString().padStart(2, "0"),
    mes = (data.getMonth() + 1).toString().padStart(2, "0"),
    hora = data.getHours().toString().padStart(2, "0"),
    minuto = data.getMinutes().toString().padStart(2, "0"),
    segundo = data.getSeconds().toString().padStart(2, "0"),
    ano = data.getFullYear();
  return `${ano}/${mes}/${dia} ${hora}:${minuto}:${segundo}`;
}

module.exports = {
  testar,
  listar,
  listarPorUsuario,
  pesquisarDescricao,
  publicar,
  editar,
  deletar,
  listarRegistros1Minuto,
};
