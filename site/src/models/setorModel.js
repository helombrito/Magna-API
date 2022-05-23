var database = require("../database/config");

/**
 *  @description Irá executar a query  INSERT INTO setor (apelidoSetor, assentosDisponiveis, fkShopping) 
        VALUES ('${apelidoSetor}', '${qtdeAssentos}', '${fkShopping}'); no banco de dados e de acordo com os parametros enviados será um novo setor
 * 
 * @param {string} apelidoSetor Nome do setor Leste, Oeste, Norte etc...
 * @param {number} qtdeAssentos Quantidade de assentos que o setor terá 
 * @param {number} fkShopping De qual shopping este setor será inserido (pegar da sessionStorage) 
 */
function inserirSetorBanco (apelidoSetor, qtdeAssentos, fkShopping) {
    var instrucao =
        `
        INSERT INTO setor (apelidoSetor, assentosDisponiveis, fkShopping) 
        VALUES ('${apelidoSetor}', '${qtdeAssentos}', '${fkShopping}');
    `;
    return database.executar(instrucao);
}

/**
 * 
 * @returns {Promise<Array<object>>} Vai retornar uma promessa dos usuarios retornados do banco de dados
 */
function listarTodosSetores () {
    var instrucao = `
        SELECT * FROM setor;
    `;
    return database.executar(instrucao);
}

/**
 * @param {number} id ID para pesquisar no WHERE no banco de dados
 * @returns {Promise<Array<object>> | Promise<object> } Vai retornar uma promessa do usuario pelo ID
 */
function listarSetorId (id) {
    var instrucao = `
        SELECT * FROM setor WHERE idSetor = ${id};
    `;
    return database.executar(instrucao);
}

module.exports = {
    listarSetorId,
    listarTodosSetores,
    inserirSetorBanco
};