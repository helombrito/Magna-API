
pegarDadosKPI().then((dados) => {
    plotarBox(dados, document.getElementById("#box1"));
  });
  
  function plotarBox(
    dados,
    box = document.querySelector("#box1")
    ){
      for( var i = 0; i < dados.length; i++){
          console.log(dados);
        box1.innerHTML = `
        <h3 class="font-md bold mb" id="">Dia da semana mais</h3>
        <span class="font-sm">Vazio</span>
        <h2 class="title-3">${dados[i]}</h2>
        <hr />
        <span class="font-sm">Cheio</span>
        <h2 class="title-3">Sexta</h2>`;
      }
    }