var usuarioModel = require("../models/usuarioModel");
const nodemailer = require("nodemailer");

var sessoes = [];

function testar(req, res) {
  console.log("ENTRAMOS NA usuarioController");
  res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
  usuarioModel
    .listar()
    .then(function (resultado) {
        res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao realizar a consulta! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function validarId(req, res) {
  var email = req.body.emailServer;

  usuarioModel
    .validar(email)
    .then(function (resultado) {
        res.json(resultado).status(200);
    })
    .catch(function (erro) {
      res.status(500).json(erro);
    });
}

// esqueci minha senha
//
async function enviar_email(req, res) {
  var email = req.body.emailServer;
  var id = req.body.id;
  console.log(req.body);
  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  }else
  if (id == undefined) {
    res.status(400).send("Seu email está undefined!");
  }

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      // mudar
      user: "magna.sptech@gmail.com",
      pass: "M@gna2020",
    },
  });

  // enviando email com o objeto de transporte definido
  let info = await transporter.sendMail({
    from: '"Magna" <magna.sptech@gmail.com>', // Endereço de email de quem esta enviando
    to: `${email}`, // lista de enviados
    subject: "Recuperação de senha.", // Subject line
    text: "Acesse o link para criar sua nova senha.", // plain text body
    // id indo como letras"id" e dando erro nos site
    html: `<b><h1>Acesse o link para criar sua nova senha.</h1></b><br> 
        <a href='http://magna.azurewebsites.net/trocarSenha.html?id=${id}'>
        http://magna.azurewebsites.net/trocarSenha.html?id=${id}</a>`, // html body
  });

  res.json({message: 'Enviado com sucesso'}).status(200)
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {number} id
 */
function trocarSenha(req, res, id) {
  var senha = req.body.novaSenhaServer;
  if (senha == undefined) {
    console.log("Sua senha está indefinida!");
  } else if (id == undefined) {
    console.log("Seu id está indefinida!");
  } else {
    usuarioModel
      .trocarSenha(senha, id)
      .then(function (resultado) {
        // console.log(`\nResultados encontrados: ${resultado.length}`);
        // console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

        return res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\nErro no login! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

// vai comparar se o select lá da pagina é igual ao VALUE 'nenhum' que defini como se ele não tivesse selecionado nada;
// loga com select
// loga sem select
// loga com select e é adm
function entrar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var selectShop = req.body.selectShopServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    if (selectShop == "0") {
      usuarioModel
        .entrar(email, senha)
        .then((resultado) => {
          if (resultado.length == 1) {
            res.json({ resultado, none: "S" });
          } else {
            console.log("usuario não encontrado");
          }
        })
        .catch(function (erro) {
          console.log(erro);
          res.status(500).json(erro.sqlMessage);
        });
    } else if (selectShop != "0") {
      usuarioModel
        .verificaUsuario(email, senha, selectShop)
        .then((resultado) => {
          if (resultado.length == 1) {
            res.json({ resultado, none: "N" });
          } else if (resultado.length == 0) {
            res.status(404).json({ error: "Precisa verificar as credenciais" });
          }
        })
        .catch(function (erro) {
          console.log(erro);
          res.status(500).json(erro.sqlMessage);
        });
    }
  }
}
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
function mudarDisponibilidade(req, res) {
  let id = req.body.id;
  let disponibilidade = req.body.disponibilidade;

  if (id && disponibilidade) {
    usuarioModel
      .mudarDisponibilidade(disponibilidade, id)
      .then((val) => {
        usuarioModel.pesquisarIdUsuario(id).then((user) => {
          user[0].none = "S";
          res.json(user[0]).status(200);
        });
      })
      .catch((err) => res.status(500).json({ message: err }));
  }
}
function cadastrar(req, res) {
  var nome = req.body.nomeServer;
  var cnpj = req.body.cnpjServer;
  var tel = req.body.telServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var cep = req.body.cepServer;
  var numLocal = req.body.numServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (cnpj == undefined) {
    res.status(400).send("Seu CNPJ está undefined!");
  } else if (tel == undefined) {
    res.status(400).send("Seu tel está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (cep == undefined) {
    res.status(400).send("Sua CEP está undefined!");
  } else if (numLocal == undefined) {
    res.status(400).send("Sua numLocal está undefined!");
  } else {
    usuarioModel.pesquisarCnpj(cnpj).then((val) => {
      if (val.length == 0) {
        usuarioModel.pesquisarEmail(email).then((valEmail) => {
          if (valEmail.length == 0) {
            usuarioModel
              .cadastrar(nome, email, senha)
              .then((valUser) => {
                usuarioModel
                  .inserirShop(nome, cnpj, tel, cep, numLocal)
                  .then((valShop) => {
                    usuarioModel.pegarUltimoShop().then((ultShop) => {
                      usuarioModel
                        .pegarUltimoUser()
                        .then((ultUser) => {
                          usuarioModel.insereLogin(
                            ultUser[0].max,
                            ultShop[0].max,
                            "MAS"
                          );
                        })
                        .then((valLogin) => {
                          res
                            .status(200)
                            .json("Shopping cadastrado com sucesso");
                        });
                    });
                  });
              })
              .catch(function (erro) {
                console.log(erro);
                console.log(
                  "\nHouve um erro ao realizar o cadastro! Erro: ",
                  erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
              });
          } else {
            res.status(402).json("Email já cadastrado");
          }
        });
      } else {
        res.status(403).json("CNPJ já cadastrado");
      }
    });
    // return console.log(nome, cnpj, tel, email, senha, cep, numLocal);
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
  }
}

function cadastrar_usuario(req, res) {
  var nomeCompleto = req.body.nomeCompletoServer;
  var email = req.body.emailServer;
  var cpf = req.body.cpfServer;
  var senha = req.body.senhaServer;
  var dtNasc = req.body.dtNascServer;
  if (nomeCompleto == undefined) {
    res.status(400).send("Seu nome completo está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu e-mail está undefined!");
  } else if (cpf == undefined) {
    res.status(400).send("Seu CPF está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Seu senha está undefined!");
  } else if (dtNasc == undefined) {
    res.status(400).send("Seu dtNasc está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    //! verificar cpf e email igual mas so se der tempo
    usuarioModel
      .cadastrar_usuario(nomeCompleto, email, cpf, senha, dtNasc)
      .then(function (resultado) {
        res.json(resultado).status(200);
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function pegarUsersDisponiveis(req, res) {
  usuarioModel
    .pegarUsersDisponiveis()
    .then((val) => {
      res.json(val).status(200);
    })
    .catch((err) => res.json(err).status(500));
}

function pegarUsuariosShopping(req, res) {
  if (+req.params.id > 0) {
    usuarioModel
      .pegarUsuariosShopping(+req.params.id)
      .then((val) => {
        res.json(val).status(200);
      })
      .catch((err) => res.json(err).status(500));
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
function cadastrarLogin(req, res) {
  let fkShopping = req.body.fkShopping;
  let fkUser = req.body.fkUser;
  let cargo = req.body.cargo;
  if (fkShopping && fkUser && cargo) {
    if (cargo == "MAS" || cargo == "MON" || cargo == "ADM") {
      usuarioModel
        .insereLogin(fkUser, fkShopping, cargo)
        .then((val) => {
          res.status(200).json({ message: "Login criado com sucesso" });
        })
        .catch((err) =>
          res.status(500).json({ message: "Cargo errado", erro: err })
        );
    }
  } else {
    res.json({ message: "Falta parametros" }).status(500);
  }
}
module.exports = {
  entrar,
  cadastrar,
  cadastrar_usuario,
  listar,
  testar,
  validarId,
  enviar_email,
  trocarSenha,
  mudarDisponibilidade,
  pegarUsersDisponiveis,
  cadastrarLogin,
  pegarUsuariosShopping,
};
