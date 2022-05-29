showMenu("cadastroUsuario");
showFooter();
var nomeCompleto = "";
var email = "";
var cpf = "";
var senha = "";
var confirmarSenha = "";
var termos = "";
var dtNasc = "";

function cadastrarUsuario() {
  nomeCompleto = in_nome_completo;
  dtNasc = in_dtNasc;
  email = in_email_usuario;
  cpf = in_cpf_usuario;
  senha = in_senha_usuario;
  confirmarSenha = in_conf_usuario;
  termos = privacidade;

  if (validarCampos()) {
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
        nomeCompletoServer: nomeCompleto,
        emailServer: email,
        cpfServer: cpf,
        senhaServer: senha,
        dtNascServer: dtNasc,
      }),
    }).then(function (resposta) {
      console.log("resposta: ", resposta);
      if (resposta.ok) {
        showMessageSuccess(
          "Cadastro realizado com sucesso! Redirecionando para tela de Login..."
        );
        loadingElement().then((val) => {
          if (val) {
            window.location = "login.html";
          }
        });
      } else {
        showMessageError("Houve um erro ao tentar realizar o cadastro!");
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    });

    return false;
  }
}

function validarCampos() {
  var emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gm;
  var cpfRegex = /^\d{11}$/gm;

  if (
    checkInput(nomeCompleto, 100, 3, /^[a-zA-Zà-úÀ-Ú\s]*$/gm) &&
    checkInput(email, 100, 5, emailRegex) &&
    checkInput(cpf, 11, 11, cpfRegex) &&
    // cpnj only numbers
    // telefone only numbers
    checkInput(in_dtNasc, 11, 9) &&
    checkInput(senha, 60, 4) &&
    checkInput(confirmarSenha, 60, 4) &&
    checkCheckbox(termos)
  ) {
    if (senha.value.trim() !== confirmarSenha.value.trim()) {
      return inputErrorMessage(confirmarSenha, "Senhas não são identicas");
    } else {
      inputErrorMessageClear(confirmarSenha);
    }

    nomeCompleto = in_nome_completo.value;
    dtNasc = in_dtNasc.value;
    email = in_email_usuario.value;
    cpf = in_cpf_usuario.value;
    senha = in_senha_usuario.value;
    return true;
  }
}
