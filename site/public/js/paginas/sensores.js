/** @type {HTMLInputElement | string} */
let apelidoSetor;
// /** @type {HTMLInputElement | number} */
let qtdeSensores;

/** @type {number} */
let fkSetor;

/** @type {Array<object>} */

showMenuRestrito();

pegarDadosSensores().then((sensor) => {
  let colunasTabela = ["ID", "Setor"];

  plotarTabela(colunasTabela, sensor, document.getElementById("table"));
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

  for (let i = 0; i < data.length; i++) {
    tbody.innerHTML += `
            <tr>
            <th scope="row">${data[i].ID}</th>
            <td>${data[i].Setor}</td>
            </tr>
            `;
  }
}
/**
 * @description
 * @param {Array<object> | Promise<Array<object>>} data
 * @param {HTMLSelectElement} select
 */
function plotarSelect(data, select = document.querySelector("select#select")) {
  for (let i = 0; i < data.length; i++)
    select.innerHTML += `
            <option value='${data[i].ID}'>${data[i].Apelido}</option>
        `;
}
pegarDadosSetores().then((setores) => {
  plotarSelect(setores, document.querySelector("#select_setor"));
});
function inserirSensores() {
  if (document.querySelector("#select_setor").value !== 0) {
    // tudo validado aqui dentro
    data = {
      fkSetorServer: document.querySelector("#select_setor").value,
    };
    limparCampos();
    fetch("/sensores/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) =>
        response.json().then((json) => {
          // nossa resposta vindo do controller
          console.log(json, response);
          if (response.status == 200) {
            showMessageSuccess("sensor inserido com sucesso!");
          } else {
            showMessageError("Houve algum erro ao inserir o sensor");
          }
        })
      )
      .catch((error) => {
        showMessageError(error);
      });
  } else {
    showMessageWarning("Selecione um Setor");
  }
}
