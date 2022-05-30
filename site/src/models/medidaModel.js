var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
                        temperatura, 
                        umidade, 
                        momento,
                        CONVERT(varchar, momento, 108) as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
                        temperatura, 
                        umidade, 
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc limit ${limite_linhas}`;
    } else {
        //console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    //console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
                        temperatura, 
                        umidade, CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
                        temperatura, 
                        umidade, DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc limit 1`;
    } else {
        //console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    //console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// aqui é a query já pronta puxando o id do shopping requerido
function setorMaisLotado(fkShopping) {

    // dia setor mais lotado
    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1 apelidoSetor ,count(captura) as Qtde from registro
        join sensor on Sensor.idSensor = fkSensor
                join setor on idSetor = fkSetor
                        where captura = 1 and fkShopping = ${fkShopping}
                               group by apelidoSetor order by count(captura) desc;`


    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select apelidoSetor ,count(captura) as Qtde from registro
        join sensor on idSensor = fkSensor 
        join setor on idSetor = fkSetor 
        where captura = 1 and fkShopping = ${idShopping}
        group by fkSensor order by count(captura) desc limit 1;`;


    } else {
        // console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }


    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function setorMenosLotado(fkShopping) {
    //dia setor menos lotado
    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1 apelidoSetor ,count(captura) as Qtde from registro
        join sensor on Sensor.idSensor = fkSensor
                join setor on idSetor = fkSetor
                        where captura = 1 and fkShopping = ${fkShopping}
                               group by apelidoSetor order by count(captura) asc;`


    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select apelidoSetor ,count(captura) as Qtde from registro
        join sensor on idSensor = fkSensor 
        join setor on idSetor = fkSetor 
        where captura = 1 and fkShopping = ${idShopping}
        group by fkSensor order by count(captura) asc limit 1;`;


    } else {
        // console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }


    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function diaSemanaMaisCheio(fkShopping) {
    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select count(datacaptura) as QtdeRegistro,
	case 
		when weekday (dataCaptura) = 0 then 'Segunda-Feira'
        when weekday (dataCaptura) = 1 then 'Terça-Feira'
        when weekday (dataCaptura) = 2 then 'Quarta-Feira'
        when weekday (dataCaptura) = 3 then 'Quinta-Feira'
        when weekday (dataCaptura) = 4 then 'Sexta-Feira'
        when weekday (dataCaptura) = 5 then 'Sábado'
        when weekday (dataCaptura) = 6 then 'Domingo'
        else 0 end  as Dia from Registro 
		where captura = 1 and fkShopping = ${fkShopping}
        group by dia order by QtdeRegistro desc limit 1;
           `


    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select apelidoSetor ,count(captura) as Qtde from registro
        join sensor on idSensor = fkSensor 
        join setor on idSetor = fkSetor 
        where captura = 1 and fkShopping = ${fkShopping}
        group by fkSensor order by count(captura) asc limit 1;`;


    } else {
        // console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }


    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function diaSemanaMaisVazio(fkShopping) {
    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select count(datacaptura) as QtdeRegistro,
	case 
		when weekday (dataCaptura) = 0 then 'Segunda-Feira'
        when weekday (dataCaptura) = 1 then 'Terça-Feira'
        when weekday (dataCaptura) = 2 then 'Quarta-Feira'
        when weekday (dataCaptura) = 3 then 'Quinta-Feira'
        when weekday (dataCaptura) = 4 then 'Sexta-Feira'
        when weekday (dataCaptura) = 5 then 'Sábado'
        when weekday (dataCaptura) = 6 then 'Domingo'
        else 0 end  as Dia from Registro 
		where captura = 1 and fkShopping = ${fkShopping}
        group by dia order by QtdeRegistro asc limit 1;
           `


    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select apelidoSetor ,count(captura) as Qtde from registro
        join sensor on idSensor = fkSensor 
        join setor on idSetor = fkSetor 
        where captura = 1 and fkShopping = ${fkShopping}
        group by fkSensor order by count(captura) asc limit 1;`;


    } else {
        // console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }


    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function mesCheio(fkShopping) {
    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {

        instrucaoSql = `select month(dataCaptura) mes, count(idRegistro),
	case 
		when month (dataCaptura) = 1 then 'Janeiro'
		when month (dataCaptura) = 2 then 'Fevereiro'
		when month (dataCaptura) = 3 then 'Março'
		when month (dataCaptura) = 4 then 'Abril'
		when month (dataCaptura) = 5 then 'Maio'
		when month (dataCaptura) = 6 then 'Junho'
		when month (dataCaptura) = 7 then 'Julho'
		when month (dataCaptura) = 8 then 'Agosto'
		when month (dataCaptura) = 9 then 'Setembro'
		when month (dataCaptura) = 10 then 'Outubro'
		when month (dataCaptura) = 11 then 'Novembro'
		when month (dataCaptura) = 12 then 'Dezembro'
        else 0 end  as Mes, 
    count(datacaptura) as MesCheio
    from registro where fkShopping = ${fkShopping} group by mes order by MesCheio desc limit 1;
    
           `


    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select apelidoSetor ,count(captura) as Qtde from registro
        join sensor on idSensor = fkSensor 
        join setor on idSetor = fkSetor 
        where captura = 1 and fkShopping = ${fkShopping}
        group by fkSensor order by count(captura) asc limit 1;`;


    } else {
        // console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }


    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function mesVazio(fkShopping) {
    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {

        instrucaoSql = `select month(dataCaptura) mes, count(idRegistro),
	case 
		when month (dataCaptura) = 1 then 'Janeiro'
		when month (dataCaptura) = 2 then 'Fevereiro'
		when month (dataCaptura) = 3 then 'Março'
		when month (dataCaptura) = 4 then 'Abril'
		when month (dataCaptura) = 5 then 'Maio'
		when month (dataCaptura) = 6 then 'Junho'
		when month (dataCaptura) = 7 then 'Julho'
		when month (dataCaptura) = 8 then 'Agosto'
		when month (dataCaptura) = 9 then 'Setembro'
		when month (dataCaptura) = 10 then 'Outubro'
		when month (dataCaptura) = 11 then 'Novembro'
		when month (dataCaptura) = 12 then 'Dezembro'
        else 0 end  as Mes, 
    count(datacaptura) as MesCheio
    from registro where fkShopping = ${fkShopping} group by mes order by MesCheio asc limit 1;
    
           `


    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select apelidoSetor ,count(captura) as Qtde from registro
        join sensor on idSensor = fkSensor 
        join setor on idSetor = fkSetor 
        where captura = 1 and fkShopping = ${fkShopping}
        group by fkSensor order by count(captura) asc limit 1;`;


    } else {
        // console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }


    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function graficoLinha(fkShopping, horario, horario2) {
    var instrucaoSql = `select apelidoSetor, count(idRegistro) as 'registro' from Shopping 
    join Setor on idShopping = fkShopping 
    join Sensor on idSetor = fkSetor 
    join registro on idSensor = fkSensor 
    where dataCaptura between '2022-03-29 ${Number(horario)}:00:00'
    and '2022-03-29 ${Number(horario2)}:00:00'
    and idShopping = '${fkShopping}'
    group by apelidoSetor`;
    return database.executar(instrucaoSql);
    // console.log("Executando a instrução SQL: \n" + instrucaoSql);

}
module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    setorMaisLotado,
    setorMenosLotado,
    diaSemanaMaisCheio,
    diaSemanaMaisVazio,
    mesCheio,
    mesVazio,
    graficoLinha
}