showMenu('cadastro');
showFooter();
function cadastrar () {

    var emailVar = in_email.value;
    var nomeVar = in_nome.value;
    var cnpjVar = in_cnpj.value;
    var telVar = in_tel.value;
    var senhaVar = in_senha.value;
    var confVar = in_conf.value;

    if (
        emailVar == '' ||
        nomeVar == '' ||
        cnpjVar == '' ||
        telVar == '' ||
        senhaVar == '' ||
        confVar == ''
    )
    {
        showMessageWarning('Preencha todos os campos');
    } else if (emailVar.indexOf('@') == -1)
    {
        deleteMessageError();
        erro.innerHTML = `Seu e-mail está invalido.`;
        erro.className = 'erro';
    } else if (senhaVar.toLowerCase().trim() != confVar.toLowerCase().trim())
    {
        erro.innerHTML = `As senhas não são iguais`;
        erro.className = 'erro';
    } else
    {
        erro.innerHTML = `Usuário cadastrado com sucesso!!`;
        erro.className = 'success';

        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                nomeServer: nomeVar,
                cnpjServer: cnpjVar,
                telServer: telVar,
                senhaServer: senhaVar,
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok)
            {
                cardErro.style.display = "block";

                mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                setTimeout(() => {
                    // window.location = "login.html";
                }, "2000");

                limparFormulario();
                finalizarAguardar();
            } else
            {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            // finalizarAguardar();
        });

    }


    return false;

    function sumirMensagem () {
        cardErro.style.display = "none";
    }
}

