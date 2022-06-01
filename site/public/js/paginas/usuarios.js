showMenuRestrito();
const plotarSelectUsuariosDisponiveis = () => {
  openLoad();
  fetch("/usuarios/listarDisponiveis")
    .then((res) =>
      res
        .json()
        .then((json) => {
          if (res.status == 200) {
            if (json.length > 0) {
              for (let i = 0; i < json.length; i++) {
                select_usuariosDisponiveis.innerHTML += `<option value='${json[i].idUsuario}' >${json[i].nome} / ${json[i].idUsuario}</option>`;
              }
            }
          } else {
            showMessageWarning("Sem usuários disponiveis");
          }
        })
        .catch((err) => showMessageError(err))
    )
    .catch((err) => showMessageError(err))
    .finally(()=>closeLoad());
};

plotarSelectUsuariosDisponiveis();
const cadastrar = () => {
  // cadastrarLogin
  let user = select_usuariosDisponiveis.value;
  let cargo = select_permicao.value;

  if (user != "0" && cargo != "0") {
    openLoad();
    fetch("usuarios/cadastrarLogin", {
      cache: "default",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        fkUser: +user,
        fkShopping: get_user_session().idShopping,
        cargo: cargo,
      }),
    })
      .then((res) =>
        res.json().then((json) => {
          showMessageSuccess(json.message);

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
      )
      .catch((err) => showMessageWarning(err))
      .finally(()=>closeLoad());
  } else {
    showMessageWarning("Selecione as opções corretamente");
  }
};

pegarUsuariosShopping(get_user_session().idShopping).then((users) => {
  let colunas = ["ID", "Nome", "Email", "Permissão"];

  plotarTabela(colunas, users);
});

/**
 * @description
 * @param {Array<string>} columns
 * @param {Array<object> | Promise<Array<object>>} data
 * @param {HTMLTableElement} table
 */
function plotarTabela(
  columns,
  data,
  table = document.querySelector("table#table")
) {
  const tr = table.tHead.children[0];
  const tbody = table.querySelector("tbody");

  tbody.innerHTML = "";
  tr.innerHTML = "";

  for (let i = 0; i < columns.length; i++)
    tr.innerHTML += `<th scope="col">${columns[i]}</th>`;

  for (let i = 0; i < data.length; i++)
    tbody.innerHTML += `
            <tr>
            <th scope="row">${data[i].ID}</th>
            <td>${data[i].Nome}</td>
            <td>${data[i].Email}</th>
            <td>${data[i].Permissao}</th>
            </tr>
            `;
}
