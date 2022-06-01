var medidaModel = require("../models/medidaModel");
//KPI SOBRE SETOR MAIS LOTADO
function kpiSetor(req, res) {
  var fkShopping = req.params.fkShopping;
  console.log(fkShopping);
  medidaModel
    .setorMaisLotado(fkShopping)
    .then(function (setorMaisLotado) {
      console.log(setorMaisLotado);
      medidaModel.setorMenosLotado(fkShopping).then((setorMenosLotado) => {
        res.status(200).json({
          setorMaisLotado,
          setorMenosLotado,
        });
      });

    })
    .catch(function (erro) {
      res.status(500).json(erro);
    });
}
//KPI SOBRE DIA DA SEMANA MAIS LOTADO
function pegarDiaSemana(req, res) {
  var fkShopping = req.params.fkShopping;

  medidaModel
    .diaSemanaMaisCheio(fkShopping)
    .then(function (diaSemanaMaisCheio) {
        console.log(diaSemanaMaisCheio);
        medidaModel
          .diaSemanaMaisVazio(fkShopping)
          .then((diaSemanaMaisVazio) => {
            console.log(diaSemanaMaisVazio);
              res.status(200).json({
                diaSemanaMaisCheio,
                diaSemanaMaisVazio,
              });
          });
      
    })
    .catch(function (erro) {
      res.status(500).json(erro);
    });
}
// KPI SOBRE MÊS DO ANO MAIS LOTADO
function pegarMes(req, res) {
  var fkShopping = req.params.fkShopping;

  medidaModel
    .mesCheio(fkShopping)
    .then(function (mesCheio) {
        console.log(mesCheio);
        medidaModel.mesVazio(fkShopping).then((mesVazio) => {
          console.log(mesVazio);
            res.status(200).json({
              mesCheio,
              mesVazio,
            });
        });
     
    })
    .catch(function (erro) {
      res.status(500).json(erro);
    });
}

function graficoLinha(req, res) {
  var fkShopping = req.params.fkShopping;
  var horario = Number(req.params.horario);
  var horario2 = horario + 2;
  var ontem = new Date().setHours(-1); //"-1" ele pega a ultima hora do dia anterior
  ontem = new Date(ontem) // o comando setHours devolve a data em milisegundos então precisamos converter isso

  var dataformatada = ontem.toLocaleDateString('pt-BR'); // como a data do brasil é diferente da americana, precisamos inverter ano, mês e ano, mas precisamos receber ela vinda do Brasil o toLocaleDateString só define de que lugar ela vai pegar os dados de dia e horario
  dataformatada = dataformatada.split('/').reverse().join('-') // para formatar a data vamos usar o 

  console.log(dataformatada.split('/').reverse().join(''));

  if (horario == 22) {
    horario2 = "23";
  }
  medidaModel
    .graficoLinha(fkShopping, horario, horario2, dataformatada)
    .then(function (resultado) {
      console.log(resultado);

      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      res.status(500).json(erro);
    });
}

function buscarUltimasMedidas(req, res) {
  const limite_linhas = 7;

  var idAquario = req.params.idAquario;

  console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

  medidaModel
    .buscarUltimasMedidas(idAquario, limite_linhas)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasEmTempoReal(req, res) {
  var idAquario = req.params.idAquario;

  console.log(`Recuperando medidas em tempo real`);

  medidaModel
    .buscarMedidasEmTempoReal(idAquario)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  buscarUltimasMedidas,
  buscarMedidasEmTempoReal,
  kpiSetor,
  pegarDiaSemana,
  pegarMes,
  graficoLinha,
};
