function pegarDadosKPI() {
    data = {
        fkShoppingServer: get_user_session().fkShopping,
    }
    fetch("/medidas/kpiSetor", {
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((json) => {
            kpiSetor.innerHTML = `
              <h3 class="font-md bold mb">Setor</h3>
              <span class="font-sm">Mais utilizado</span>
              <h2 class="title-3">${json.setorMaisLotado[0].apelidoSetor}</h2>
              <hr />
              <span class="font-sm">Menos utilizado</span>
              <h2 class="title-3">${json.setorMenosLotado[0].apelidoSetor}</h2>`;

        })
        .catch((error) => {
            showMessageError("Erro ao listar sensores");
            reject(error);
            console.error(error);
        });
}

function pegarDiaSemana() {
    fetch("/medidas/kpiSemana")
        .then((response) => response.json())
        .then((json) => {
            kpiSemana.innerHTML = `
              <h3 class="font-md bold mb">Dia da semana mais</h3>
              <span class="font-sm">Vazio</span>
              <h2 class="title-3">Terça</h2>
              <hr />
              <span class="font-sm">Cheio</span>
              <h2 class="title-3">Sexta</h2>
              `;

        })
        .catch((error) => {
            showMessageError("Erro ao listar sensores");
            reject(error);
            console.error(error);
        });
}

function pegarMes() {
    fetch("/medidas/kpiMes")
        .then((response) => response.json())
        .then((json) => {
            kpiMes.innerHTML = `
              <h3 class="font-md bold mb">Dia da semana mais</h3>
              <span class="font-sm">Vazio</span>
              <h2 class="title-3">Terça</h2>
              <hr />
              <span class="font-sm">Cheio</span>
              <h2 class="title-3">Sexta</h2>
              `;

        })
        .catch((error) => {
            showMessageError("Erro ao listar sensores");
            reject(error);
            console.error(error);
        });
}
pegarDadosKPI();
pegarDiaSemana();