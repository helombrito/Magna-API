showFooter();
showMenu("login");
plotarSelect();
if (get_user_session() !== undefined) {
  if (get_user_session().none == "N") {
    window.location.href = "dashboard.html";
  } else if (get_user_session().none == "S") {
    window.location.href = "perfilUser.html";
  }
}
function plotarSelect(
  response,
  select = document.querySelector("select#select")
) {
  fetch("/usuarios/listar")
    .then((response) => {
      response.json().then((shoppings) => {
        for (let i = 0; i < shoppings.length; i++) {
          select_shop.innerHTML += `<option value="${shoppings[i].nomeShopping}">
                                ${shoppings[i].nomeShopping}
                            </option>
                        `;
        }
      });
      return;
    })
    .catch((error) => {
      showMessageError(error);
    });
}

function entrar() {
  var emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gm;
  /** @type {HTMLInputElement} */
  var emailVar = inp_email;
  /** @type {HTMLInputElement} */
  var senhaVar = inp_senha;

  if (checkInput(emailVar, 100, 4, emailRegex) && checkInput(senhaVar, 60, 4)) {
    emailVar = inp_email.value;
    senhaVar = inp_senha.value;
    selectShopVar = select_shop.value;
    limparCampos();
    document.querySelector("button").disabled = true;

    fetch("/usuarios/autenticar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailServer: emailVar,
        senhaServer: senhaVar,
        selectShopServer: selectShopVar,
      }),
    })
      .then(function (resposta) {
        document.querySelector("button").disabled = false;
        if (resposta.status == 200) {
          resposta.json().then((json) => {
            json.resultado[0].none = json.none;
            sessionStorage.setItem("user", JSON.stringify(json.resultado[0]));

            loadingElement(document.body, 3000).then((val) => {
              if (val) {
                if (json.none == "N") {
                  window.location = "dashboard.html";
                } else if (json.none == "S") {
                  window.location = "perfilUser.html";
                }
              }
            });
          });
        } else {
          resposta.json().then((json) => {
            showMessageWarning(json.error || "Erro");
          });
        }
      })
      .catch((err) => {
        showMessageError(err);
        limparCampos();
      });
  }
}
