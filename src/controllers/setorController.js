const setorModel = require('../models/setorModel');
/**
 * @description
 * @author Delfino
 * @date 22/05/2022
 * @param {Request} req
 * @param {Response} res
 */
function pegarTodosSetores (req, res) {
    setorModel.listarTodosSetores()
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
 * @author Delfino
 * @date 22/05/2022
 * @param {Request} req
 * @param {Response} res
 */
function pegarSetorId (req, res) {

}
/**
 * @description
 * @author Delfino
 * @date 22/05/2022
 * @param {Request} req
 * @param {Response} res
 */
function inserirSetor (req, res) {
    let apelido = req.body.apelidoSetorServer;
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

        setorModel.inserirSetorBanco(apelido, qtdeAssentos, fkShopping)
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
    pegarTodosSetores,
    pegarSetorId,
    inserirSetor
};