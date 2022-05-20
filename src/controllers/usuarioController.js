var usuarioModel = require("../models/usuarioModel");
const nodemailer = require("nodemailer");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function validarId(req, res) {
    var email = req.body.emailServer;

    usuarioModel.validar(email)
        .then(
            function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                if (resultado.length == 1) {
                    console.log(resultado);
                    res.json(resultado[0]);
                } else if (resultado.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


// esqueci minha senha
// 
async function enviar_email(req) {


    // colocar a variavel dentro do to
    var email = req.body.emailServer;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
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
        html: `<b>Acesse o link para criar sua nova senha.</b><br>
        <a href="http://localhost:3333/trocarSenha.html">http://localhost:3333/trocarSenha.html</a>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
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
        usuarioModel.trocarSenha(senha, id)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        console.log("Senha inválida");
                    } else {
                        console.log("Sucesso ao mudar senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nErro no login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        console.log("Email e/ou senha inválido(s)");
                    } else {
                        console.log("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nErro no login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
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
        res.status(400).send("Seu telefone está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Sua CEP está undefined!");
    } else if (numLocal == undefined) {
        res.status(400).send("Sua CEP está undefined!");
    } else {
        // return console.log(nome, cnpj, tel, email, senha, cep, numLocal);
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, cnpj, tel, email, senha, cep, numLocal)
            .then(
                function (resultado) {

                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);

                }
            );
    }
}


function cadastrar_usuario(req, res) {
    var nomeCompleto = req.body.nomeCompletoServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var senha = req.body.senhaServer;

    if (nomeCompleto == undefined) {
        res.status(400).send("Seu nome completo está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu e-mail está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu CPF está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Seu senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar_usuario(nomeCompleto, cpf, email, senha)
            .then(
                function (resultado) {

                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);

                }
            );
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
    trocarSenha
};