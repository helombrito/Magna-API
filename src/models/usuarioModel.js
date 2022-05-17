var database = require("../database/config");
 // esqueci minha senha
const nodemailer = require("nodemailer");


function listar () {
    // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM shopping;
    `;
    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar (email, senha) {
    // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);
    var instrucao = `
        SELECT * FROM usuario WHERE emailUsuario = '${email}' AND senhaUsuario = md5('${senha}');
    `;
    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function validar (email) {
    // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);
    var instrucao = `
        SELECT * FROM usuario WHERE emailUsuario = '${email}';
    `;

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}





function nova_senha(senha){


    var instrucao = ` update usuario set senha = '${novaSenha}'  where emailUsuario = '${email}'`
    return database.executar(instrucao);


}
// esqueci minha senha
async function enviar_email() {
  


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "magna.sptech@gmail.com", // generated ethereal user
            pass: "M@gna2020", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Magna" <magna.sptech@gmail.com>', // sender address
        to: "pedrohenriqueranea@gmail.com", // list of receivers
        subject: "Recuperação de senha.", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar (email, nome, cnpj, tel, senha) {
    // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", email, nome, cnpj, tel, senha);
    var instrucao = `INSERT INTO shopping (nome, cnpj, tel) VALUES ('${nome}', '${cnpj}', '${tel}');
        
    `;
    var instrucao2 = `INSERT INTO usuario (emailusuario, senhausuario) VALUES ('${email}', md5('${senha}')); 
    `;

    // console.log("Executando a instrução SQL: \n" + instrucao);
    database.executar(instrucao2);
    return database.executar(instrucao);
}

module.exports = {
    entrar: entrar,
    cadastrar: cadastrar,
    listar: listar,
    validar: validar,
    enviar_email: enviar_email
   
};