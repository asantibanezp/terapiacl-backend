const { response } = require("express");
const { query, buildParams } = require("../database/sql-connection");
const { simpleQuery } = require("../database/simpleQuery")
const { existeSucursal, existeEspecialidad } = require("../helpers/db-validators")
const { getEspecialidadesBySucursal } = require("../helpers/db-queries")
const { nombreEspecialistasByToLink } = require("../helpers/general")



const getEspecialidadesMenu = async (req, res = response) => {

    const { cod_sucursal, to_link_sucursal } = req.body

    and_codsucursal = ''
    and_tolink = ''
    join_tolink = ''

    if(cod_sucursal){

        if (!await existeSucursal(cod_sucursal, undefined)){
            return res.status(400).json({
                msg: 'No existe la sucursal'
            })
        }
        and_codsucursal = `and es.sucursal = ${ cod_sucursal } `

    }else if (to_link_sucursal){

        if (!await existeSucursal(undefined, to_link_sucursal)){
            return res.status(400).json({
                msg: 'No existe la sucursal'
            })
        }
        join_tolink = `inner join Sucursal s on(es.Sucursal = s.CodSucursal) `
        and_tolink = `and s.ToLink = '${ to_link_sucursal }' `

    }

    const params = [];
    let sql = `
    select distinct 
    es.Nombre, 
    case
    when es.Nombre in ('Psicología', 'Psiquiatría', 'Neurología') then --Si es psicologia, psiquiatria o neurología concatena nombre con RangoEtario
    CONCAT(es.Nombre, ' ',re.Nombre)
    else
    es.Nombre
    end
    as NombreCompleto,
    es.CodSiat, 
    es.Orden,
    es.Imagen,
    es.ToLink,
    re.Nombre, 
    re.Id
    from Especialidades es
    inner join RangoEtario re on(es.rangoetario = re.Id)`
    +join_tolink
    +`where es.activa = 1 `
    +and_tolink
    +and_codsucursal
    +`
    and es.Id not in(
	select Id from Especialidades where RangoEtario = 3 and CodSiat in(8, 9, 91) --No muestra RangoEtario si es psicologia, psiquiatria o neurología
	)
    `
    sql += `order by es.Orden asc`

    await query(params, sql, undefined, result => {
        res.json({
            result
        })
    });

}

const getEspecialidadesBilingue = async (req, res = response) => {

    const { cod_sucursal, to_link_sucursal, locale = 'en' } = req.body

    let and_codsucursal = ''
    let and_tolink = ''
    let join_tolink = ''
    let name_concat = ''

    if(cod_sucursal){

        if (!await existeSucursal(cod_sucursal, undefined)){
            return res.status(400).json({
                msg: 'No existe la sucursal'
            })
        }
        and_codsucursal = `and es.sucursal = ${ cod_sucursal } `

    }else if (to_link_sucursal){

        if (!await existeSucursal(undefined, to_link_sucursal)){
            return res.status(400).json({
                msg: 'No existe la sucursal'
            })
        }
        join_tolink = ` inner join Sucursal s on(es.Sucursal = s.CodSucursal) `
        and_tolink = `and s.ToLink = '${ to_link_sucursal }' `

    }

    name_concat = (locale === 'en')
    ? `CONCAT(reni.${ locale }, ' ',eni.${ locale })`
    : `CONCAT(eni.${ locale }, ' ', reni.${ locale })`


    const params = [];
    let sql = `
    select distinct
    case
    when es.Nombre in ('Psicología', 'Psiquiatría', 'Neurología') then --Si es psicologia, psiquiatria o neurología concatena nombre con RangoEtario 
    ${ name_concat }
    else
    eni.${ locale }
    end
    as NombreCompleto,
    es.Orden
    from Especialidades es
    inner join RangoEtario re on(es.rangoetario = re.Id)
	inner join EspecialidadesNombreIdioma eni on(eni.EspecialidadId = es.Id)
	inner join RangoEtarioNombreIdioma reni on (reni.RangoEtarioId = re.Id)`
    +join_tolink
    +`where es.activa = 1 `
    +and_tolink
    +and_codsucursal
    +`
    and es.Id not in(
	select Id from Especialidades where RangoEtario = 3 and CodSiat in(8, 9, 91) --No muestra RangoEtario si es psicologia, psiquiatria o neurología
	)
    `
    sql += `order by es.Orden asc`

    await query(params, sql, undefined, result => {
        res.json({
            result
        })
    });

}

const getEspecialidad = async (req, res = response) => {
    const { toLink } = req.params
    const { addMeta, addDescripcionGlosa, addProblemas, addNombreEspecialistasPlural } = req.body

    // console.log(toLink)
    // console.log(addMeta)

    if (!await existeEspecialidad(undefined, toLink)){
        return res.status(400).json({
            msg: 'No existe la especialidad'
        })
    }

    const qryEspecialidad = `
    SELECT TOP 1 esp.Id, esp.CodSiat, esp.RangoEtario, esp.Nombre, esp.ToLink, esp.Imagen, re.Nombre, esp.Sucursal,
    CASE
    WHEN esp.Nombre in ('Psicología', 'Psiquiatría', 'Neurología') then --Si es psicologia, psiquiatria o neurología concatena nombre con RangoEtario
        CONCAT(esp.Nombre, ' ',re.Nombre)
        ELSE
        esp.Nombre
        END
        AS NombreCompleto
    FROM Especialidades esp
    inner join RangoEtario re on(re.Id = esp.RangoEtario)
    where esp.ToLink = '${ toLink }'`
    const especialidad = await simpleQuery(qryEspecialidad); // Busca Sucursal

    if(addMeta){
        const qryMetaTags = `select Name as name, Content as content from EspecialidadesMetaTag 
        where Activo = 1 and CodSiat = ${ especialidad[0].CodSiat } and RangoEtario = ${ especialidad[0].RangoEtario }`
        const metaTags = await simpleQuery(qryMetaTags); // Busca MetaTags asociadas
        especialidad[0].MetaTags = metaTags // Añade MetaTags

        const qryMetaTitle = `select top 1 Content as content from EspecialidadesMetaTitle 
        where Activo = 1 and CodSiat = ${ especialidad[0].CodSiat } and RangoEtario = ${ especialidad[0].RangoEtario }`
        const metaTitle = await simpleQuery(qryMetaTitle); // Busca MetaTitle asociado
        especialidad[0].MetaTitle = metaTitle[0].content // Añade Title
    }

    if(addDescripcionGlosa){
        const qryDescripcionGlosa = `select Descripcion from EspecialidadesDescripcionGlosa where Vigente = 1 and EspecialidadId = ${ especialidad[0].Id } order by orden`
        const descripcionGlosa = await simpleQuery(qryDescripcionGlosa)
        especialidad[0].DescripcionGlosaFirst = descripcionGlosa.splice(0, 1)[0]
        especialidad[0].DescripcionGlosaRest = descripcionGlosa 
    }

    if(addProblemas){
        const qryProblemas = `select p.NombreProblema, p.ToLink, tp.CodTipoProblema ,tp.NombreTipoProblema from Problema p
        inner join EspecialidadProblema ep on(ep.CodProblema = p.CodProblema)
        inner join TipoProblemaProblema tpp on(tpp.CodProblema = p.CodProblema)
        inner join TipoProblema tp on(tp.CodTipoProblema = tpp.CodTipoProblema)
        where EspecialidadId = ${ especialidad[0].Id } order by tp.CodTipoProblema`
        const arrProblemas = await simpleQuery(qryProblemas)

        const qryTiposProblemas = 'select CodTipoProblema, NombreTipoProblema from TipoProblema where Vigente = 1'
        const tiposProblemas = await simpleQuery(qryTiposProblemas)
        const arreglo = []

        tiposProblemas.map((tipo, i) => {
            let problemas = arrProblemas.filter(problema => problema.CodTipoProblema === tipo.CodTipoProblema)
            if(problemas.length > 0){
                arreglo.push(problemas)
            }
        })      
        especialidad[0].Problemas = arreglo
    }

    if(addNombreEspecialistasPlural){
        especialidad[0].NombreEspecialistas = nombreEspecialistasByToLink(especialidad[0].ToLink)
    }
    

    res.json({
       result: especialidad
    })
}

const getEspecialidadesCombos = async(req, res = response) => {

    const toLink = req.query.toLink
    let especialidades = await getEspecialidadesBySucursal(toLink)

    res.json({
       result: especialidades
    })

}

module.exports = {
    getEspecialidadesMenu,
    getEspecialidadesBilingue,
    getEspecialidad,
    getEspecialidadesCombos
}