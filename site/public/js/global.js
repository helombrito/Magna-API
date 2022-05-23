function logout () {
  window.location = "index.html";
}
function showFooter (container = "footer") {
  var place = document.getElementById(container);
  var html = `
    <div class="container-lg">
        <div class="logo">
            <a href="/">
                <img src="../../image/magna/logoBranco.png" alt="Magna, Logotipo, Empresa">
            </a>
        </div>
        <div class="footer-meio flex-center">
            <span class="endereco">Av. Angélica, 1048 São Paulo - SP, 01227100
            </span>
            <span class="copyright">Copyright © 2010-2022 Magna Company S.L. Todos os direitos reservados.</span>
        </div>
        <div class="footer-redes">
            <span class="email">magna.sptech@gmail.com</span>
            <div class="redes-sociais">
                <a href="https://www.facebook.com/MagnaItda" class="icon" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-facebook-square"></i>
                </a>
                <a href="https://www.instagram.com/magnaltda/" class="icon" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-instagram"></i>
                </a>
                <a href="link-linkedin" class="icon" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-linkedin"></i>
                </a>
                <a href="#link-google" class="icon" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-google"></i>
                </a>

            </div>
        </div>
    </div>
    `;

  place.innerHTML = html;
}
function showMenu (page, container = "header") {
  var html = `
        <div class="navbar container-lg ">
            <div class="logo">
                <a href="/">
                    <img src="../../image/magna/logoBranco2.png" alt="Logotipo, Logo, Image, Magna">
                </a>
            </div>
            <ul class="menu">
                <li class="item" title="Inicio"><a href="/" class="link">Inicio</a></li>
                <li class="item" title="Sobre"><a href="/" class="link">Sobre</a></li>
                <li class="item" title="Contato"><a href="/" class="link">Contato</a></li>
                <li class="item" title="Simulador Financeiro"><a href="/simulador.html" class="link">Simulador</a></li>
                <li class="item" title="Entrar"><a href="/login.html" class="link">Entrar</a></li>
                <li class="item" title="Cadastrar"><a href="/cadastro.html" class="link">Cadastrar</a></li>
            </ul>
        </div>
    `;
  var doc = document.getElementById(container);
  doc.innerHTML = html;
  if (page == "index")
  {
    doc.querySelector("li[title='Inicio'] a").classList.add("bold");
    doc.querySelector("li[title='Sobre'] a").href = "#body_sobre";
    doc.querySelector("li[title='Contato'] a").href = "#contact";
  } else if (page == "simulador")
  {
    doc
      .querySelector("li[title='Simulador Financeiro'] a")
      .classList.add("bold");
  } else if (page == "login")
  {
    doc.querySelector("li[title='Entrar'] a").classList.add("bold");
  } else if (page == "cadastro")
  {
    doc.querySelector("li[title='Cadastrar'] a").classList.add("bold");
  }
}

function showMessageError (
  text,
  container = document.querySelector("#alertas")
) {
  if (container)
  {
    container.innerHTML = `<span class='alert error'>${text} <i class='fa fa-exclamation-circle'></i> </span>`;

    setTimeout(() => {
      container.querySelector(".alert").classList.add("show");
    }, 100);
  }
}
function deleteMessageError (container = document.querySelector("#alertas")) {
  if (container)
  {
    container.querySelectorAll(".error").forEach((val) => {
      val.classList.remove("show");
      setTimeout(() => {
        val.remove();
      }, 1000);
    });
  }
}
function showMessageSuccess (
  text,
  container = document.querySelector("#alertas")
) {
  if (container)
  {
    container.innerHTML = `<span class='alert success'>${text} <i class='fa fa-check-circle'></i> </span>`;

    setTimeout(() => {
      container.querySelector(".alert").classList.add("show");
    }, 100);
  }
}
function deleteMessageSuccess (container = document.querySelector("#alertas")) {
  if (container)
  {
    container.querySelectorAll(".success").forEach((val) => {
      val.classList.remove("show");
      setTimeout(() => {
        val.remove();
      }, 1000);
    });
  }
}
function showMessageWarning (
  text,
  container = document.querySelector("#alertas")
) {
  if (container)
  {
    container.innerHTML = `<span class='alert warning'>${text} <i class='fa fa-warning'></i> </span>`;

    setTimeout(() => {
      container.querySelector(".alert").classList.add("show");
    }, 100);
  }
}
function deleteMessageWarning (container = document.querySelector("#alertas")) {
  if (container)
  {
    container.querySelectorAll(".warning").forEach((val) => {
      val.classList.remove("show");
      setTimeout(() => {
        val.remove();
      }, 1000);
    });
  }
}
function clearMessages (container = document.querySelector("#alertas")) {
  if (container)
  {
    container.innerHTML = "";
  }
}
// default function to validate some fields from html
function checkInput (
  input = document.querySelector("input"),
  max = null,
  min = null,
  regex = null
) {
  if (input != undefined)
  {
    if (input.parentNode && input.parentNode.querySelector(".alert.error"))
    {
      inputErrorMessageClear(input);
    }
    if (input.value.trim() == "" || input.value.trim().length == 0)
    {
      return inputErrorMessage(input, "Esse campo deve ser preenchido");
    }
    if (min !== null && input.value.trim().length < min)
    {
      return inputErrorMessage(
        input,
        `Esse campo ter pode ter ${min} ou mais caracteres`
      );
    }
    if (max !== null && input.value.trim().length > max)
    {
      return inputErrorMessage(
        input,
        `Esse campo pode ter no máximo ${max} caracteres`
      );
    }
    if (regex !== null && !regex.test(input.value.trim()))
    {
      return inputErrorMessage(input, "Preencha o campo de forma correta");
    }
    if (!input.checkValidity())
    {
      return inputErrorMessage(input, input.validationMessage);
    }
    return true;
  }
}
// when add validate field in js, use this function to generate message and change input to error
function inputErrorMessage (input, message = null) {
  var pn = input.parentNode;

  input.classList.add("invalid");
  if (message != null)
  {
    let alert = document.createElement("small");
    alert.className = "alert error";
    alert.innerText = message;
    pn.appendChild(alert);

    setTimeout(() => {
      alert.classList.add("show");
    }, 10);
  }
  return false;
}
function inputErrorMessageClear (input) {
  input.classList.remove("invalid");
  let pn = input.parentNode.querySelector(".alert.error");
  if (pn)
  {
    pn.classList.remove("show");
    pn.remove();
  }
}

function checkCheckbox (
  checkbox = document.querySelector("input"),
  containerAlert = document.querySelector("div#alertas")
) {
  if (checkbox)
  {
    var pn = checkbox.parentNode;
    if (!checkbox.checked)
    {
      pn.classList.add("error");
      showMessageWarning(
        "Aceite os termos de uso e privacidade!",
        containerAlert
      );
      return false;
    } else
    {
      pn.classList.remove("error");
      clearMessages(containerAlert);
      return true;
    }
  }
}

/**
 *
 * @param {HTMLElement | HTMLButtonElement | HTMLBodyElement} container Elemento onde realizara a animacao de loading, 3 modelos padrao, para elementos comuns, botoes e body
 * @param {number} [timeout = 2000]
 * @returns {Promise<boolean>}
 */
function loadingElement (container = document.body, timeout = 2000) {
  if (container)
  {
    let text = container.innerHTML;
    container.classList.add("loading");
    if (container == document.body)
    {
      // create modal loading
      container.innerHTML += `
                <div class='modal container-md flex-center'>
                    <img src='../image/loading.gif' width='50' />
                </div>
            `;
    } else
    {
      container.innerHTML += `
                <img src='../image/loading.gif' style='max-width: 2em' />
            `;
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        container.classList.remove("loading");
        container.innerHTML = text;
        resolve(true);
      }, timeout);
    });
  }
}

function limparCampos () {
  document.querySelectorAll("input").forEach((val, key) => {
    if (val.type == "checkbox")
    {
      val.checked = false;
    } else val.value = "";
  });
}
