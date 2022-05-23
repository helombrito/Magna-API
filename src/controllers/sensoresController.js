const SensorModel = require('../models/sensoresModel');
/**
 * @description
 * @author pedro e lincoln
 * @date 22/05/2022
 * @param {Request} req
 * @param {Response} res
 */
function pegarTodosSensores (req, res) {
    SensorModel.listarTodosSensores()
        .then(function (resultado) {
            if (resultado.length > 0)
            {
                res.status(200).json(resultado);
            } else
            {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(
            function (erro) {
                res.status(500).json(erro);
            }
        );
}
/**
 * @description
 * @author pedro e lincoln
 * @date 22/05/2022
 * @param {Request} req
 * @param {Response} res
 */
function pegarSensoresId (req, res) {

}
/**
 * @description
 * @author pedro e lincoln
 * @date 22/05/2022
 * @param {Request} req
 * @param {Response} res
 */
function inserirSensores (req, res) {
    let apelido = req.body.apelidoSensorServer;
    let qtdeAssentos = req.body.qtdeAssentosServer;
    let fkShopping = req.body.fkShoppingServer;

    if (apelido == undefined)
    {
        res.status(400).send("Seu apelido está undefined!");
    }
    else if (qtdeAssentos == undefined)
    {
        res.status(400).send("Seu qtdeAssentos está undefined!");
    }
    else if (fkShopping == undefined)
    {
        res.status(400).send("Seu fkShopping está undefined!");
    } else
    {

        SensorModel.inserirSensoresBanco(apelido, qtdeSensores)
            .then(resultado => {
                res.json(resultado).status(200);
            })
            .catch(erro => {
                res.status(500).json(erro);
            });
    }
}

module.exports =
{
    pegarTodosSensores,
    pegarSensoresId,
    inserirSensores
};