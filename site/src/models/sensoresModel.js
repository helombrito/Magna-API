var database = require("../database/config");

/**
 *  @description Irá executar a query  INSERT INTO Sensores (apelidoSensores, assentosDisponiveis, fkShopping) 
        VALUES ('${apelidoSensores}', '${qtdSensores}', '${fkShopping}'); no banco de dados e de acordo com os parametros enviados será um novo Sensores
 * 
 * @param {string} apelidoSensores Nome do Sensores Leste, Oeste, Norte etc...
 * @param {number} qtdSensores Quantidade de assentos que o Sensores terá 
 * @param {number} fkShopping De qual shopping este Sensores será inserido (pegar da sessionStorage) 
 */
function inserirSensoresBanco (apelidoSensores, qtdSensores, fkShopping) {
    // select sensor.idSensor, setor.apelidoSetor, Setor.assentosDisponiveis from Sensor join setor on idSetor = fkSetor; 
    var instrucao = `
    SELECT sensor.idSensor, setor.apelidoSetor, Setor.assentosDisponiveis from Sensor join setor on ${idSetor} = ${fkSetor}; 

        INSERT INTO Sensores (apelidoSensores, assentosDisponiveis, fkShopping) 
        VALUES ('${apelidoSensores}', '${qtdSensores}', '${fkShopping}');
    `;
    return database.executar(instrucao);
}

/**
 * 
 * @returns {Promise<Array<object>>} Vai retornar uma promessa dos usuarios retornados do banco de dados
 */
function listarTodosSensores () {
    var instrucao = `
        SELECT * FROM Sensores;
    `;
    return database.executar(instrucao);
}

/**
 * @param {number} id ID para pesquisar no WHERE no banco de dados
 * @returns {Promise<Array<object>> | Promise<object> } Vai retornar uma promessa do usuario pelo ID
 */
function listarSensoresId (id) {
    var instrucao = `
        SELECT * FROM Sensores WHERE idSensores = ${id};
    `;
    return database.executar(instrucao);
}

module.exports = {
    listarSensoresId,
    listarTodosSensores,
    inserirSensoresBanco
};