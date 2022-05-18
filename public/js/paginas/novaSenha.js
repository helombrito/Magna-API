function novaSenha () {

     var novaSenhaVar = inp_novaSenha.value

    div_alertas = alertas;

    if (validarCampos())
    {
        showMessageSuccess('Todos os campos validados!');
        fetch("usuarios/novaSenha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                   novaSenhaServer:novaSenhaVar
            })
        }).then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {

                mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                setTimeout(() => {
                    window.location = "login.html";
                }, "2000")
                
                limparFormulario();
                finalizarAguardar();
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

        return false;
    }
    function sumirMensagem() {
        cardErro.style.display = "none"
    }

 
}