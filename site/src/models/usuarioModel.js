var database = require("../database/config");
// esqueci minha senha
// const nodemailer = require("nodemailer");

function listar() {
  // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucao = `
        SELECT * FROM shopping;
    `;
  // console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function entrar(email, senha) {
  // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);
  var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
  // console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function verificaUsuario(email, senha, selectShop) {
  // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);
  var instrucao = `SELECT * FROM login JOIN usuario ON idusuario = fkusuario JOIN shopping ON idShopping = fkShopping WHERE Usuario.email = '${email}' AND Usuario.senha = '${senha}'  AND Shopping.nomeShopping = '${selectShop}';
        
    `;
  // console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function validar(email) {
  // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);
  var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}';
    `;

  // console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function trocarSenha(senha, id) {
  var instrucao = ` update usuario set senha = '${senha}'  where idUsuario = ${id}`;
  return database.executar(instrucao);
}

// esqueci minha senha
async function enviar_email(email) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "magna.sptech@gmail.com", // generated ethereal user
      pass: "M@gna2020", // generated ethereal password
    },
  });
  // enviando email com o objeto de transporte definido
  let info = await transporter.sendMail({
    from: '"Magna" <magna.sptech@gmail.com>', // Endereço de email de quem esta enviando
    to: `${email}`, // lista de enviados
    subject: "Recuperação de senha.", // Subject line
    text: "Acesse o link para criar sua nova senha.", // plain text body
    html: `<b><h1>Acesse o link para criar sua nova senha.</h1></b><br> 
        <a href='http://magna.azurewebsites.net/trocarSenha.html?id=${id}'>
        http://magna.azurewebsites.net/trocarSenha.html?id=${id}</a>`, // html body
  });

  console.log(`E-mail enviado${id}`);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha) {
  var instrucao = `INSERT INTO usuario (nome, email, senha) VALUES ('${nome}','${email}','${senha}');`;
  return database.executar(instrucao);
}
function inserirShop(nome, cnpj, tel, cep, numLocal) {
  var instrucao = `INSERT INTO shopping (nomeShopping, cnpj, telefone, cep, numeroEndereco) VALUES ('${nome}', '${cnpj}', '${tel}', '${cep}', '${numLocal}');`;
  return database.executar(instrucao);
}
/**
 * @param {number} cnpj Para ser pesquisado no banco de dados
 */
function insereLogin(fkUser, fkShopping, permissao = "MAS") {
  var instrucao = `
    INSERT INTO login (fkShopping, fkUsuario, permissaoUsuario)
    VALUES (${fkShopping}, ${fkUser}, '${permissao}');
    `;

  return database.executar(instrucao);
}
function pesquisarCnpj(cnpj) {
  var instrucao = `select * from shopping where cnpj = '${cnpj}'`;
  //console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}
/**
 * @param {string} email Para ser pesquisado no banco de dados
 */
function pesquisarEmail(email) {
  var instrucao = `select * from usuario where email = '${email}'`;
  //console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}
function cadastrar_usuario(nomeCompleto, email, cpf, senha, dtNasc) {
  console.log("models");
  // insirir data de nasciemnto
  var instrucao = `INSERT INTO usuario (nome, email, cpf, senha, dtNasc) VALUES ('${nomeCompleto}', '${email}', '${cpf}', '${senha}', '${dtNasc}')`;
  return database.executar(instrucao);
}
function pesquisarIdUsuario(id) {
  var instrucao = `select * from usuario where idUsuario = ${id}`;
  return database.executar(instrucao);
}
function mudarDisponibilidade(disponibilidade, id) {
  var instrucao = `update Usuario set disponibilidade = '${disponibilidade}' where idUsuario = ${id}`;
  return database.executar(instrucao);
}
function pesquisarIdShopping(id) {
  var instrucao = `select * from shopping where idShopping = ${id}`;
  return database.executar(instrucao);
}
function pegarUltimoShop() {
  var instrucao = `select max(idShopping) as max from Shopping`;
  return database.executar(instrucao);
}
function pegarUltimoUser() {
  var instrucao = `select max(idUsuario) as max from usuario`;
  return database.executar(instrucao);
}
function pegarUsersDisponiveis() {
  var instrucao = `select * from Usuario left join login on fkUsuario = idUsuario where disponibilidade = 'S' and cpf is not null;`;
  return database.executar(instrucao);
}
function pegarUsuariosShopping(shop) {
  var instrucao = `select * from login join Usuario on fkUsuario = idUsuario where fkShopping = ${shop}`;
  return database.executar(instrucao);
}
module.exports = {
  entrar: entrar,
  cadastrar: cadastrar,
  cadastrar_usuario: cadastrar_usuario,
  listar: listar,
  validar: validar,
  verificaUsuario,
  enviar_email: enviar_email,
  trocarSenha: trocarSenha,
  pesquisarCnpj,
  pesquisarEmail,
  insereLogin,
  pesquisarIdShopping,
  pesquisarIdUsuario,
  inserirShop,
  pegarUltimoShop,
  pegarUltimoUser,
  mudarDisponibilidade,
  pegarUsersDisponiveis,
  pegarUsuariosShopping,
};
