
function validar(){
    var email = in_email.value;
    var nome = in_nome.value;
    var cnpj = in_cnpj.value;
    var tel = in_tel.value;
    var senha = in_senha.value;
    var conf = in_conf.value;

      if (
          email == '' ||
          nome == '' ||
          cnpj == '' ||
          tel == '' ||
          senha == '' ||
          conf == ''
          )
      {
            erro.innerHTML = `Preencha todos os campos`;
            erro.className = 'erro';
      } else if (email.indexOf('@') == -1)
      {
            erro.innerHTML = `Seu e-mail está invalido.`;
            erro.className = 'erro';
      } else if (senha.toLowerCase().trim() == conf.toLowerCase().trim())
      {
            erro.innerHTML = `As senhas não são iguais`;
            erro.className = 'erro';
      } else
      {
            erro.innerHTML = `Usuário cadastrado com sucesso!!`;
            erro.className = 'success';

            setInterval(() => {
                window.location = './login.html'
            }, 2000);
      }

      fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                emailServer: emailVar,
                nomeServer: nomeVar,
                cnpjServer: cnpjVar,
                telServer: telVar,
                senhaServer: senhaVar,                
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                cardErro.style.display = "block";

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
    
    function sumirMensagem() {
        cardErro.style.display = "none"
    }
}

