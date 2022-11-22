const { response } = require("express");
const { query, buildParams } = require("../database/sql-connection");
const {  getSucursalByToLink, getEspecialidadByToLink, capitalizeStr } = require("../helpers")
const { simpleQuery } = require("../database/simpleQuery")
const TYPES = require("tedious").TYPES


const getTerapeutas = async (req, res = response) => {

    const {
        sucursal_to_link,
        especialidad_to_link,
        cod_especialidad,
        ct, /* CodTerapeuta */
        rango_etario,
        sexo,
        edad,
        nombre,
        desde,
        limite
    } = req.body


    // console.log(cod_terapeuta)
    // console.log(req.body)

     // OBTIENE SUCURSAL
     const arr_sucursal = await getSucursalByToLink(sucursal_to_link)
     if(!arr_sucursal){
         return res.status(400).json({
             msg: 'No existe sucursal'
         })
     }
     [ sucursal ] = arr_sucursal

    // DEFINE STRINGS PARA ARMAR QUERY
    let str_nombre = (nombre != null) ? `and t.Nombres like '%${ nombre }%' ` : '' 
    let str_sexo = (sexo != null || sexo === 0) ?  `and t.Sexo = ${ sexo } ` : ''
    let str_especialidad = ''
    let str_rango_etario = ''
    let str_edad = ''
    let str_ct = ''
    
    // OBTIENE ESPECIALIDAD
    if(cod_especialidad != null){
        str_especialidad = `and CodEspecialidad = ${cod_especialidad} `
    }else if(especialidad_to_link != null){
        const arr_especialidad = await getEspecialidadByToLink(especialidad_to_link)
        if(!arr_especialidad){
            return res.status(400).json({
                msg: 'La especialidad ingresada no existe'
            })
        }
        str_especialidad = `and CodEspecialidad = ${arr_especialidad[0].CodSiat} `
    }

    // OBTIENE RANGO ETARIO
    if(rango_etario != null){
        str_rango_etario += `and ret.CodRangoEdad = ${ rango_etario.CodRangoEdad } `
    }

    // OBTIENE EDAD
    if(edad != null){
        str_edad += `
        and floor(
        (cast(convert(varchar(8),getdate(),112) as int)-
        cast(convert(varchar(8),t.FechaNacimiento,112) as int) ) / 10000
        ) `
        if(edad === 0){
            str_edad += `< 40 `
        }else if(edad === 1){
            str_edad += `> 40 `
        }
    }
    
    // POR COD_TERAPEUTA
    if(ct){
        str_ct = `and t.CodTerapeuta = ${ ct } `
    }

    // ARMA QUERY Y VA SIN PARAMETROS
    var params = [];
    var sql = `
    ;WITH General_CTE AS(
    select distinct
    t.CodTerapeuta,
    t.Nombres,
    t.Titulo,
    t.Universidad,
    t.Rut,
    CASE 
	when t.TituloEspecialidad = '' and t.NombreUniversidadBecaEspecializacion <> '' then t.NombreUniversidadBecaEspecializacion
	when t.TituloEspecialidad <> '' and t.NombreUniversidadBecaEspecializacion = '' then t.TituloEspecialidad
	when t.TituloEspecialidad = '' and t.NombreUniversidadBecaEspecializacion = '' then ''
	else  CONCAT(t.TituloEspecialidad, ' - ' ,t.NombreUniversidadBecaEspecializacion)
	END AS Especializaciones,
    DATEDIFF(hour,t.FechaNacimiento,GETDATE())/8766 as Edad
    from Terapeuta_${ sucursal.DatabaseName } t
    inner join RangoEdadTerapeuta_${ sucursal.DatabaseName } ret on(ret.CodTerapeuta = t.CodTerapeuta)
    inner join ProblemaTerapeuta_${ sucursal.DatabaseName } pt on(pt.CodTerapeuta = t.CodTerapeuta) where flgactividad = 1 `
    + str_especialidad
    + str_nombre
    + str_edad
    + str_sexo
    + str_rango_etario
    + str_ct
    + `)
    , Contador_CTE AS (
    select distinct
    contador_general = COUNT(*) OVER()
    from Terapeuta_${ sucursal.DatabaseName } t
    inner join RangoEdadTerapeuta_${ sucursal.DatabaseName } ret on(ret.CodTerapeuta = t.CodTerapeuta)
    inner join ProblemaTerapeuta_${ sucursal.DatabaseName } pt on(pt.CodTerapeuta = t.CodTerapeuta) where flgactividad = 1 `
    + str_especialidad
    + str_nombre
    + str_edad
    + str_sexo
    + str_rango_etario
    + str_ct
    + `group by t.CodTerapeuta
    )
    SELECT *
    FROM General_CTE, Contador_CTE
    ORDER BY General_CTE.Nombres
    OFFSET ${ desde } ROWS 
    FETCH NEXT ${ limite } ROWS ONLY`;

    buildParams(params, "desde", TYPES.Int, desde);
    buildParams(params, "limite", TYPES.Int, limite);

    arrTerapeutas = await simpleQuery(sql)
    const terapeutas = []

    // console.log(sql)

    // ORDENA SALIDA
    arrTerapeutas.map((item, i) => {
        item.Titulo = capitalizeStr(item.Titulo)
        item.Universidad = capitalizeStr(item.Universidad)
        item.Especializaciones = capitalizeStr( item.Especializaciones)
        item.tolAble = 0

        let tolDelimiter = item.Nombres.indexOf('(')
        if(tolDelimiter > -1){
            item.Nombres = item.Nombres.substr(0, tolDelimiter - 1)
            item.tolAble = 1
        }
        terapeutas.push(item)
    })

    delete arrTerapeutas

    res.json({
        result: terapeutas,
        total: terapeutas.length > 0 ? terapeutas[0].contador_general : null,
    })

}

const getTerapeuta = async (req, res = response) => {

    const {
        sucursal_to_link,
        cod_terapeuta,
        addRangoEtario,
        addProblemas,
    } = req.body


    // OBTIENE SUCURSAL
    const arr_sucursal = await getSucursalByToLink(sucursal_to_link)
    if(!arr_sucursal){
        return res.status(400).json({
            msg: 'No existe sucursal'
        })
    }
    [ sucursal ] = arr_sucursal
    
    // QUERY
    const params = [];
    const sqlTerapeuta = `select t.CodTerapeuta, t.Nombres, t.Titulo, t.AreasDeInteres, 
    CONCAT(es.Nombre, ' - ', t.Universidad) as TituloProfesional, 
    CONCAT(t.TituloEspecialidad, ' - ', t.NombreUniversidadBecaEspecializacion) as Especializacion,
    t.Rut
    from Terapeuta_${ sucursal.DatabaseName } t
    inner join Especialidades es on(t.CodEspecialidad = es.CodSiat)
    where FlgActividad = 1 and CodTerapeuta = ${ cod_terapeuta }`;
    const terapeuta = await simpleQuery(sqlTerapeuta)

    terapeuta[0].TituloProfesional = capitalizeStr(terapeuta[0].TituloProfesional)
    terapeuta[0].Especializacion = capitalizeStr(terapeuta[0].Especializacion)
    
    if(addRangoEtario){
        const sqlRangosEtarios = `select re.NombreRangoEdad from RangoEdades_${ sucursal.DatabaseName } re
        inner join RangoEdadTerapeuta_${ sucursal.DatabaseName } ret on(ret.CodRangoEdad = re.CodRangoEdad)
        where ret.CodTerapeuta = ${ terapeuta[0].CodTerapeuta }`
        const rangosEtarios = await simpleQuery(sqlRangosEtarios)

        strRangosEtarios = ''
        rangosEtarios.map((item, i) =>{
            if(i > 0 && i < rangosEtarios.length-1){
                strRangosEtarios += ', '
            }
            else if(i > 0 && i === rangosEtarios.length-1){
                strRangosEtarios += ' y '
            }

            strRangosEtarios += capitalizeStr(item.NombreRangoEdad)
            
        })
        terapeuta[0].RangosEtarios = strRangosEtarios
    }

    if(addProblemas){
        const sqlProblemas = `select p.NombreProblema from Problema_${ sucursal.DatabaseName } p
        inner join ProblemaTerapeuta_${ sucursal.DatabaseName } pt on(pt.CodProblema = p.CodProblema)
        where pt.Especializado = 1
        and pt.CodTerapeuta =  ${ terapeuta[0].CodTerapeuta }`
        const problemas = await simpleQuery(sqlProblemas)
        
        arrProblemas = []
        problemas.map((item, i) => {
            item.NombreProblema = capitalizeStr(item.NombreProblema)
            arrProblemas.push(item)
        })
        terapeuta[0].Problemas = arrProblemas
    }

    res.json({
        result: terapeuta,
        sucursal: sucursal.CodSucursal
    })

}


module.exports = {
    getTerapeutas,
    getTerapeuta,
}