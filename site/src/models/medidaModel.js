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
    }

    //console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// aqui é a query já pronta puxando o id do shopping requerido
function setorMaisLotado(fkShopping) {

    // dia setor mais lotado
    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1 apelidoSetor ,count(captura) as Qtde from shopping join setor on fkShopping = idShopping
        join sensor on fkSetor = idSetor
                join registro on fkSensor = idSensor
                        where captura = 1 and fkShopping = ${fkShopping}
                               group by apelidoSetor order by count(captura) desc;
`


    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select top 1 apelidoSetor ,count(captura) as Qtde from shopping join setor on fkShopping = idShopping
        join sensor on fkSetor = idSetor
                join registro on fkSensor = idSensor
                        where captura = 1 and fkShopping = ${fkShopping}
                               group by apelidoSetor order by count(captura) desc
`
    }

    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function setorMenosLotado(fkShopping) {
    //dia setor menos lotado
    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1 apelidoSetor ,count(captura) as Qtde from shopping join setor on fkShopping = idShopping
        join sensor on fkSetor = idSetor
                join registro on fkSensor = idSensor
                        where captura = 1 and fkShopping = ${fkShopping}
                               group by apelidoSetor order by count(captura) asc;
`


    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select top 1 apelidoSetor ,count(captura) as Qtde from shopping join setor on fkShopping = idShopping
        join sensor on fkSetor = idSetor
                join registro on fkSensor = idSensor
                        where captura = 1 and fkShopping = ${fkShopping}
                               group by apelidoSetor order by count(captura) asc;
`

    }


    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function diaSemanaMaisCheio(fkShopping) {
    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ` select count(datacaptura) as QtdeRegistro,
        case 
            when datename(WEEKDAY, dataCaptura) = 'Monday' then 'Segunda'
            when datename(WEEKDAY, dataCaptura) = 'Tuesday' then 'Terça'
            when datename(WEEKDAY, dataCaptura) = 'Wednesday' then 'Quarta'
            when datename(WEEKDAY, dataCaptura) = 'Thursday' then 'Quinta'
            when datename(WEEKDAY, dataCaptura) = 'Friday' then 'Sexta'
            when datename(WEEKDAY, dataCaptura) = 'Saturday' then 'Sábado'
            when datename(WEEKDAY, dataCaptura) = 'Sunday' then 'Domingo'
            else 'error' end as 'dia'
        from shopping join setor on idShopping = fkShopping 
        join sensor on idSetor = fkSetor 
        join registro on idSensor = fkSensor
        where captura = 1 and fkShopping = ${fkShopping}
        group by datename(WEEKDAY, dataCaptura)
        order by QtdeRegistro desc;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select top 1 count(datacaptura) as QtdeRegistro,
        case 
            when datename(WEEKDAY, dataCaptura) = 'Monday' then 'Segunda'
            when datename(WEEKDAY, dataCaptura) = 'Tuesday' then 'Terça'
            when datename(WEEKDAY, dataCaptura) = 'Wednesday' then 'Quarta'
            when datename(WEEKDAY, dataCaptura) = 'Thursday' then 'Quinta'
            when datename(WEEKDAY, dataCaptura) = 'Friday' then 'Sexta'
            when datename(WEEKDAY, dataCaptura) = 'Saturday' then 'Sábado'
            when datename(WEEKDAY, dataCaptura) = 'Sunday' then 'Domingo'
            else 'error' end as 'dia'
        from shopping join setor on idShopping = fkShopping 
        join sensor on idSetor = fkSetor 
        join registro on idSensor = fkSensor
        where captura = 1 and fkShopping = ${fkShopping}
        group by datename(WEEKDAY, dataCaptura)
        order by QtdeRegistro desc;`;
    }
    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function diaSemanaMaisVazio(fkShopping) {
    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select count(datacaptura) as QtdeRegistro,
            case 
                when datename(WEEKDAY, dataCaptura) = 'Monday' then 'Segunda'
                when datename(WEEKDAY, dataCaptura) = 'Tuesday' then 'Terça'
                when datename(WEEKDAY, dataCaptura) = 'Wednesday' then 'Quarta'
                when datename(WEEKDAY, dataCaptura) = 'Thursday' then 'Quinta'
                when datename(WEEKDAY, dataCaptura) = 'Friday' then 'Sexta'
                when datename(WEEKDAY, dataCaptura) = 'Saturday' then 'Sábado'
                when datename(WEEKDAY, dataCaptura) = 'Sunday' then 'Domingo'
                else 'error' end as 'dia'
            from shopping join setor on idShopping = fkShopping 
            join sensor on idSetor = fkSetor 
            join registro on idSensor = fkSensor
            where captura = 1 AND fkShopping = ${fkShopping}
            group by datename(WEEKDAY, dataCaptura)
            order by QtdeRegistro;`;


    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        select count(datacaptura) as QtdeRegistro,
            case 
                when datename(WEEKDAY, dataCaptura) = 'Monday' then 'Segunda'
                when datename(WEEKDAY, dataCaptura) = 'Tuesday' then 'Terça'
                when datename(WEEKDAY, dataCaptura) = 'Wednesday' then 'Quarta'
                when datename(WEEKDAY, dataCaptura) = 'Thursday' then 'Quinta'
                when datename(WEEKDAY, dataCaptura) = 'Friday' then 'Sexta'
                when datename(WEEKDAY, dataCaptura) = 'Saturday' then 'Sábado'
                when datename(WEEKDAY, dataCaptura) = 'Sunday' then 'Domingo'
                else 'error' end as 'dia'
            from shopping join setor on idShopping = fkShopping 
            join sensor on idSetor = fkSetor 
            join registro on idSensor = fkSensor
            where captura = 1 AND fkShopping = ${fkShopping}
            group by datename(WEEKDAY, dataCaptura)
            order by QtdeRegistro desc;`;
    }
    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function mesCheio(fkShopping) {
    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {

        instrucaoSql = `select top 1 count(idRegistro) qtd,
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
            else 'err' end  as Mes
        from registro
        join sensor on idSensor = fkSensor
        join setor on idSetor = fkSetor
        where fkShopping = ${fkShopping}
        group by month (dataCaptura)
        order by qtd desc
           `


    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select top 1 count(idRegistro) qtd,
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
            else 'err' end  as Mes
        from registro
        join sensor on idSensor = fkSensor
        join setor on idSetor = fkSetor
        where fkShopping = 1
        group by month (dataCaptura)
        order by qtd desc`;
    }
    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function mesVazio(fkShopping) {
    var instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {

        instrucaoSql = `select top 1 count(idRegistro) qtd,
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
            else 'err' end  as Mes
        from registro
        join sensor on idSensor = fkSensor
        join setor on idSetor = fkSetor
        where fkShopping = ${fkShopping}
        group by month (dataCaptura)
        order by qtd
           `

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select apelidoSetor ,count(captura) as Qtde from registro
        join sensor on idSensor = fkSensor 
        join setor on idSetor = fkSetor 
        where captura = 1 and fkShopping = ${fkShopping}
        group by fkSensor order by count(captura) asc limit 1;`;
    }
    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoLinha(fkShopping, horario, horario2, dataformatada) {
    var instrucaoSql = `select '${horario}' as hora, apelidoSetor, count(idRegistro) as 'registro' from Shopping 
    join Setor on idShopping = fkShopping 
    join Sensor on idSetor = fkSetor 
    join registro on idSensor = fkSensor 
    where dataCaptura between '${dataformatada} ${(horario)}:00:00'
    and '${dataformatada} ${horario2}:00:00'
    and idShopping = '${fkShopping}'
    group by apelidoSetor`;
    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
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

