/** @type {HTMLInputElement | string} */
let apelidoSetor;
// /** @type {HTMLInputElement | number} */
let qtdeSensores;

/** @type {number} */
let fkSetor;

/** @type {Array<object>} */


/**
 * @returns {Promise<Array<object>>}  
 */
function pegarDadosSensores() {
    return new Promise((resolve, reject) => {
        fetch('/sensores/listar')
            .then(response => response.json())
            .then(json => {
                let array = [];
                for (let i = 0; i < json.length; i++) {
                    let linha = {};
                    linha.ID = (json[i].idSetor);
                    linha.fkSetor = (json[i].fkSetor);

                    array.push(linha);
                }
                resolve(array);
                return array;
            })
            .catch(error => {
                showMessageError('Erro ao listar sensores');
                reject(error);
                console.error(error);
            });
    });
}

pegarDadosSensores()
    .then(sensor => {
        let colunasTabela = ['ID', 'fkSetor'];

        plotarTabela(colunasTabela, sensores, document.getElementById('table'));
    });
/**
 * @description
 * @param {Array<string>} columns
 * @param {Array<object> | Promise<Array<object>>} data
 * @param {HTMLTableElement} table
 */
function plotarTabela(columns, data, table = document.querySelector('table#table'),) {
    const tr = table.tHead.children[0];
    const tbody = table.querySelector('tbody');

    tbody.innerHTML = '';
    tr.innerHTML = '';

    for (let i = 0; i < columns.length; i++)
        tr.innerHTML += `<th scope="col">${columns[i]}</th>`;

    console.log(typeof data);
    for (let i = 0; i < data.length; i++) {
        tbody.innerHTML +=
            `
            <tr>
            <th scope="row">${data[i].ID}</th>
            <td>${data[i].fkSetor}</td>
            <td>${data[i].Assentos}</th>
            </tr>
            `;
    }

}
function inserirSensores() {
    // validar campos
     apelidoSetor =select_setor;
     qtdSensor = input_qtd_sensor;

    if (validarCampos()) {
        // tudo validado aqui dentro
        data = {
            apelidoSetorServer: apelidoSetor,
            qtdSensorServer: qtdSensor,
        };
        limparCampos();
        fetch('/sensores/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json().then(json => {
                // nossa resposta vindo do controller
                console.log(json, response);
                if (response.status == 200) {
                    showMessageSuccess('sensor inserido com sucesso!');
                } else {
                    showMessageError('Houve algum erro ao inserir o sensor');
                }
            }))
            .catch(error => {
                showMessageError(error);
            });

    }
}
function validarCampos() {
    if (
        checkInput(apelidoSetor, 60, 3, /^[a-zA-Zà-úÀ-Ú\s]*$/gm) &&
        checkInput(qtdeAssentos, 10, 1, /^[\d]*$/)) {
        fkShopping = 1;

        if (fkShopping && fkShopping > 0 && fkShopping != undefined) {
            qtdSensor = qtdSensor.value;
            apelidoSetor = apelidoSetor.value;
            return true;
        }
        return false;
    }
}