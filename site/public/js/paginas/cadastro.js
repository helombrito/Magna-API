showMenu("cadastro");
showFooter();
var email = "";
var nome = "";
var cnpj = "";
var telefone = "";
var numLocal = "";
var cep = "";
var senha = "";
var confirmarSenha = "";
var termos = "";

var div_alertas = "";

function cadastrar () {
  email = in_email;
  nome = in_nome;
  cep = in_cep;
  numLocal = in_numLocal;
  cnpj = in_cnpj;
  tel = in_tel;
  senha = in_senha;
  confirmarSenha = in_conf;
  termos = privacidade;

  div_alertas = alertas;

  if (validarCampos())
  {
    let dataBody = {
      emailServer: email.value,
      nomeServer: nome.value,
      cnpjServer: cnpj.value,
      telServer: tel.value,
      cepServer: cep.value,
      numServer: numLocal.value,
      senhaServer: senha.value,
    };
    limparCampos();
    /** @type {HTMLButtonElement} */
    let button = document.querySelector("button#btn_cadastrar");
    button.onclick = () => { };
    // Rota Cadastrar dentro de usuarios.js
    fetch("usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataBody),
    })
      .then(function (resposta) {
        if (resposta.status == 200)
        {
          showMessageSuccess(
            "Cadastro realizado com sucesso!"
          );
          loadingElement(button, 4000).then((val) => {
            if (val)
            {
              window.location = "login.html";
            }
          });
        } else if (resposta.status == 403)
        {
          showMessageWarning('CNPJ já cadastrado!');
        }
        else if (resposta.status == 402)
        {
          showMessageWarning('Email já cadastrado!');
        }
        else
        {
          // button.onclick = cadastrar();
          showMessageError("Houve um erro ao tentar realizar o cadastro!");
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.error(`Erro: ${resposta}`);
        showMessageError(resposta);
      });

    return false;
  }
}

function validarCampos () {
  var emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gm;
  var cnpjRegex = /^\d{14}$/gm;

  if (

    checkInput(nome, 100, 3, /^[a-zA-Zà-úÀ-Ú\s]*$/gm) &&
    checkInput(email, 100, 5, emailRegex) &&
    // cpnj only numbers
    checkInput(cep, 8, 8, /^\d{8}$/gm) &&
    checkInput(numLocal, 7, 1, /^\d{1,7}$/) &&
    checkInput(cnpj, 14, 14, cnpjRegex) &&
    // tel only numbers
    checkInput(tel, 11, 9, /^\d{9,11}$/gm) &&
    checkInput(senha, 60, 4) &&
    checkInput(confirmarSenha, 60, 4) &&
    checkCheckbox(termos, div_alertas)
  )
  {
    if (senha.value.trim() !== confirmarSenha.value.trim())
    {
      return inputErrorMessage(confirmarSenha, "Senhas não são identicas");
    } else
    {
      inputErrorMessageClear(confirmarSenha);
    }
    return true;
  }
}
