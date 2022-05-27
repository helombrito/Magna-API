/** @type {HTMLInputElement | string} */
let apelidoSetor;
/** @type {HTMLInputElement | number} */
let qtdeAssentos;

/** @type {number} */
let fkShopping;
showMenuRestrito();
pegarDadosSetores().then((setores) => {
  let colunasTabela = ["ID", "Apelido", "Assentos"];

  plotarTabela(colunasTabela, setores, document.getElementById("table"));
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
            <td>${data[i].Apelido}</td>
            <td>${data[i].Assentos}</th>
            </tr>
            `;
}
function inserirSetor() {
  // validar campos
  apelidoSetor = input_apelido_setor;
  qtdeAssentos = input_qts_assentos;

  if (validarCampos()) {
    // tudo validado aqui dentro
    data = {
      apelidoSetorServer: apelidoSetor,
      qtdeAssentosServer: qtdeAssentos,
      fkShoppingServer: fkShopping,
    };
    limparCampos();
    fetch("/setores/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) =>
        response.json().then((json) => {
          // nossa resposta vindo do controller
          console.log(json, response);
          if (response.status == 200) {
            showMessageSuccess("Setor inserido com sucesso!");
          } else {
            showMessageError("Houve algum erro ao inserir o setor");
          }
        })
      )
      .catch((error) => {
        showMessageError(error);
      });
  }
}
function validarCampos() {
  if (
    checkInput(apelidoSetor, 60, 3, /^[a-zA-Zà-úÀ-Ú\s]*$/gm) &&
    checkInput(qtdeAssentos, 10, 1, /^[\d]*$/)
  ) {
    fkShopping = 1; // SESSION STORAGE

    if (fkShopping && fkShopping > 0 && fkShopping != undefined) {
      qtdeAssentos = qtdeAssentos.value;
      apelidoSetor = apelidoSetor.value;
      return true;
    }
    return false;
  }
}
