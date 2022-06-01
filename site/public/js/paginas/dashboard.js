showMenuRestrito();
let contadorAlerta = 0;

const colors = [
  ["#e83847", "#dc3545"],
  ["#4ba3c3", "#0fa3c3"],
  ["#5770dc", "#5660dc"],
  ["#0EBA3F", "#047B26"],
];
function pegaHorarioPico() {
  const labelsLine = [];
  var horario = 8;
  let fkShopping = get_user_session().fkShopping;
  /**
   * @type {Array<Array<{hora: number, apelidoSetor: string, registro: string}>>}
   */
  const dados = [];
  openLoad();
  for (var i = 0; i < 7; i++) {
    horario += 2;
    labelsLine.push(`${horario}:00`);
    fetch(`/medidas/graficoLinha/${fkShopping}/${horario}`)
      .then((response) => {
        response.json().then((json) => {
          // console.log(json);
          if (json.length > 0) {
            dados.push(json);
          }
        });
      })
      .catch((error) => {
        showMessageError("Erro ao listar dados");
        console.error(error);
      }).finally(() => {
        closeLoad()
      });
  }
  let interval = setInterval(() => {
    if(dados.length > 0){
      clearInterval(interval);
      if (dados.length > 0) {
        console.log(dados);
        let registros = dados.map((hora, index) => {
          return hora.map((val) => val.registro);
        });
        let datasets = dados[0].map((hora, i) => {
          return {
            label: hora.apelidoSetor || "Setor",
            backgroundColor: colors[i][0],
            borderColor: colors[i][1],
            data: registros.map((dado) => dado[i]),
          };
        });
        const dataLine = {
          labels: labelsLine,
          datasets: datasets,
        };
  
        const configLine = {
          type: "line",
          data: dataLine,
          options: {},
        };
        const lineChart = new Chart(
          document.getElementById("lineChart"),
          configLine
        );
      }
    }
  }, 3000);
}

let listar1minuto = async () => {
  let req = await fetch(
    `http://localhost:8080/avisos/1minuto/${get_user_session().idShopping}`
  );
  let res = await req.json();
  return res;
};

let interval = setInterval(() => {
  listar1minuto().then(
    /**
     * @param {Array<{CriticInf: number,CriticSup: number,WarningInf: number, WarningSup: number,apelidoSetor: string, qtde: number}>} val
     */
    (val) => {
      if (val && val.length > 0) {
        console.log(val);
        let data = val[contadorAlerta];
        let defaultText = `
            <div class='divisorHorizontal'></div>
                <span class='bold'>Lotação em tempo real: ${data.qtde}</span>
                <span class='bold'>Máximo de Lotação: ${data.CriticSup}</span>
                <span class='bold'>Lotação Ideal: entre ${data.WarningInf} e ${data.WarningSup}</span>
                <span class='bold'>Setor vázio: ${data.WarningInf}</span>
                <span class='bold'>Setor muito vázio: ${data.CriticInf}</span>
                `;
        if (data.qtde > data.CriticSup) {
          showModalAlerta(
            `error`,
            `Alerta Crítico!`,
            ` 
              Seu setor <span class='bold'>${data.apelidoSetor}</span> está em estado crítico de lotação!. 
                ${defaultText}
              `
          );
        } else if (data.qtde > data.WarningSup) {
          showModalAlerta(
            `warning`,
            `Alerta!`,
            ` 
                  Seu setor <span class='bold'>${data.apelidoSetor}</span> está prestes a entrar em estado de lotação, aconselhamos que tome alguma providência!. 
                ${defaultText}
              `
          );
        } else if (data.qtde < data.WarningInf) {
          showModalAlerta(
            `warning`,
            `Alerta!`,
            ` 
                  Seu setor <span class='bold'>${data.apelidoSetor}</span> está prestes a entrar em estado de esvaziamento, aconselhamos que tome alguma providência!. 
                ${defaultText}
              `
          );
        } else if (data.qtde < data.CriticInf) {
          showModalAlerta(
            `error`,
            `Alerta Crítico!`,
            ` 
                Seu setor <span class='bold'>${data.apelidoSetor}</span> está em estado crítico esvaziamento!. 
                ${defaultText}
              `
          );
        } else {
          showModalAlerta(
            `success`,
            `Olá`,
            ` 
                Seu setor <span class='bold'>${data.apelidoSetor}</span> está em estado ideal de lotação! Bela administração!. 
                ${defaultText}
              `
          );
        }

        setTimeout(() => {
          if (contadorAlerta + 1 == val.length) {
            contadorAlerta = 0;
          } else contadorAlerta++;
        }, 3000);
      }
    }
  );
}, 1000 * 20);
pegaHorarioPico();
