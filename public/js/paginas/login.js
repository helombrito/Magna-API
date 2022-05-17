showFooter();
showMenu('login');
function entrar () {
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gm;
    /** @type {HTMLInputElement} */
    var emailVar = inp_email;
    /** @type {HTMLInputElement} */
    var senhaVar = inp_senha;

    if (
        checkInput(emailVar, 100, 4, emailRegex) &&
        checkInput(senhaVar, 60, 4)
    )
    {
        emailVar = inp_email.value;
        senhaVar = inp_senha.value;
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
            console.log("ESTOU NO THEN DO entrar()!");
            if (resposta.ok)
            {

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

            } else
            {
                resposta.text().then(texto => {
                    showMessageError(texto);
                    // limparFormulario();

                });
            }

        });
    }
}

function validarSessao () {


    var login = sessionStorage.LOGIN_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var h1Titulo = document.getElementById("h1_titulo");

    if (login != null && nome != null)
    {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        h1Titulo.innerHTML = `${login}`;

        finalizar;
    } else
    {
        window.location = "login.html";
    }
}

function sair () {

    sessionStorage.clear();
    finalizar;
    window.location = "login.html";
}