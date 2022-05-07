function entrar() {

    var emailVar = inp_email.value;
    var senhaVar = inp_senha.value;


    if (emailVar == '') {
        erro.innerHTML = `Preencha o E-mail`;
        erro.className = 'erro';
    } else if (senhaVar == '') {
        erro.innerHTML = `Preencha a senha`;
        erro.className = 'erro';
    } else if (emailVar.indexOf('@') == -1) {
        erro.innerHTML = `Seu e-mail está invalido.`;
        erro.className = 'erro';
    } else if (emailVar.length < 4) {
        erro.innerHTML = `E-mail deve possuir 4 ou mais caracteres.`;
        erro.className = 'erro';
    } else if (senhaVar.length < 4) {
        erro.innerHTML = `Senha deve possuir 4 ou mais caracteres.`;
        erro.className = 'erro';
    } else {






        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")
            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    sessionStorage.LOGIN_USUARIO = json.login;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.id;

                    setTimeout(function () {
                        window.location = "/dashboard.html";
                    }, 1000);
                });

            } else {

                console.log("Erro de login!");

                resposta.text().then(texto => {
                    console.error(texto);
                    // limparFormulario();

                });
            }

        })
    }
}

function validarSessao() {


    var login = sessionStorage.LOGIN_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var h1Titulo = document.getElementById("h1_titulo");

    if (login != null && nome != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        h1Titulo.innerHTML = `${login}`;

        finalizar
    } else {
        window.location = "login.html";
    }
}

function sair() {

    sessionStorage.clear();
    finalizar
    window.location = "login.html";
}