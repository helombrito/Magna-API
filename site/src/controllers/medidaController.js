var medidaModel = require("../models/medidaModel");
//KPI SOBRE SETOR MAIS LOTADO
function kpiSetor(req,res){
    var fkShopping = req.params.fkShopping;
    console.log(fkShopping)
    medidaModel.setorMaisLotado(fkShopping)
        .then(function (setorMaisLotado){
            if (setorMaisLotado.length > 0){
                console.log(setorMaisLotado)
                medidaModel.setorMenosLotado(fkShopping)
                    .then((setorMenosLotado) => {
                        if(setorMenosLotado.length > 0){
                            res.status(200).json({setorMaisLotado, setorMenosLotado});
                        }
                    })
            } else{
                res.status(204).send("NENHUM RESULTADO ENCONTRADO");
            }
        }).catch(
            function (erro) {
                res.status(500).json(erro);
            }
        );
}
//KPI SOBRE DIA DA SEMANA MAIS LOTADO
function pegarDiaSemana(req,res){
    medidaModel.diaSemanaMaisCheio()
        .then(function (diaSemanaMaisCheio){
            if (diaSemanaMaisCheio.length > 0){
                console.log(diaSemanaMaisCheio)
                medidaModel.diaSemanaMaisVazio()
                    .then((diaSemanaMaisVazio) => {
                        console.log(diaSemanaMaisVazio)
                        if(diaSemanaMaisVazio.length > 0){
                            res.status(200).json({diaSemanaMaisCheio, diaSemanaMaisVazio});
                        }
                    })
            } else{
                res.status(204).send("NENHUM RESULTADO ENCONTRADO");
            }
        }).catch(
            function (erro) {
                res.status(500).json(erro);
            }
        );
}
// KPI SOBRE MÊS DO ANO MAIS LOTADO
function pegarMes(req,res){
    medidaModel.mesCheio()
        .then(function (mesCheio){
            if (mesCheio.length > 0){
                console.log(mesCheio)
                medidaModel.mesVazio()
                    .then((mesVazio) => {
                        console.log(mesVazio)
                        if(mesVazio.length > 0){
                            res.status(200).json({mesCheio, mesVazio});
                        }
                    })
            } else{
                res.status(204).send("NENHUM RESULTADO ENCONTRADO");
            }
        }).catch(
            function (erro) {
                res.status(500).json(erro);
            }
        );
}

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 7;

    var idAquario = req.params.idAquario;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idAquario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var idAquario = req.params.idAquario;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idAquario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    kpiSetor,
    pegarDiaSemana,
    pegarMes
}