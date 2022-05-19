showMenu("cadastro");
showFooter();
var nomeCompleto = "";
var email = "";
var cpf = "";
var senha = "";
var confirmarSenha = "";
var termos = "";

var div_alertas = "";

function cadastrar() {
  nomeCompleto = in_nome_completo;
  email = in_email;
  cpf = in_cpf;
  senha = in_senha;
  confirmarSenha = in_conf;
  termos = privacidade;

  div_alertas = alertas;

  if (validarCampos()) {
    limparCampos();
    /** @type {HTMLButtonElement} */
    let button = document.querySelector("button#btn_cadastrarUsuario");
    button.onclick = none;

    // Rota Cadastrar dentro de usuarios.js
    fetch("usuarios/cadastrar_usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        // esses valores estão dentro de req.body
        nomeCompletoServer: in_nome_completo.value,
        emailServer: in_email.value,
        cpfServer: in_cpf.value,
        senhaServer: in_senha.value,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          showMessageSuccess(
            "Cadastro realizado com sucesso! Redirecionando para tela de Login..."
          );
          loadingElement(button).then((val) => {
            if (val) {
              window.location = "login.html";
            }
          });
        } else {
          button.onclick = cadastrar();
          showMessageError("Houve um erro ao tentar realizar o cadastro!");
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        limparCampos();
        console.error(`Erro: ${resposta}`);
        showMessageError(resposta);
      });

    return false;
  }
}

function validarCampos() {
  var emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gm;
  var cnpjRegex = /^\d{14}$/gm;

  if (
    checkInput(nome, 100, 3, /^[a-zA-Zà-úÀ-Ú\s]*$/gm) &&
    checkInput(email, 100, 5, emailRegex) &&
    // cpnj only numbers
    checkInput(cpf, 14, 14, cnpjRegex) &&
    // telefone only numbers
    checkInput(senha, 60, 4) &&
    checkInput(confirmarSenha, 60, 4) &&
    checkCheckbox(termos, div_alertas)
  ) {
    if (senha.value.trim() !== confirmarSenha.value.trim()) {
      return inputErrorMessage(confirmarSenha, "Senhas não são identicas");
    } else {
      inputErrorMessageClear(confirmarSenha);
    }
    return true;
  }
}
