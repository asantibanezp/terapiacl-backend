const { simpleQuery } = require('../database/simpleQuery')


const getSucursalByToLink = async(toLink) => {

    const qry = `SELECT CodSucursal, DatabaseName FROM Sucursal WHERE ToLink = '${ toLink }'`

    let data = await simpleQuery(qry)
    let output = []

    if(data.length > 0){
        output = data
    }else{
        output = false
    }

    return output
}

const getSucursal = async(codSucursal) => {

    const qry = `SELECT CodSucursal, DatabaseName, Nombre FROM Sucursal WHERE CodSucursal = ${ codSucursal }`

    let data = await simpleQuery(qry)
    let output = []

    if(data.length > 0){
        output = data
    }else{
        output = false
    }

    return output
}


const getEspecialidadByToLink = async(toLink) => {

    const qry = `SELECT TOP 1 CodSiat FROM Especialidades WHERE ToLink = '${ toLink }'`

    let data = await simpleQuery(qry)
    let output = []

    if(data.length > 0){
        output = data
    }else{
        output = false
    }

    return output
}

const getCharlaByToLink = async(toLink) => {

    const qry = `SELECT TOP 1 CodCharla, Titulo FROM Charlas WHERE ToLink = '${ toLink }'`
    let data = await simpleQuery(qry)

    return data
}

const getEspecialidadesBySucursal = async(toLink) => {

    const qry = `
    select distinct 
    case
    when es.Nombre in ('Psicología', 'Neurología') then 
    CONCAT(es.Nombre, ' ',re.Nombre)
    else
    es.Nombre
    end
    as NombreCompleto,
    es.CodSiat,
    es.ToLink,
    re.Id as CodRangoEtario
    from Especialidades es
    inner join RangoEtario re on(es.rangoetario = re.Id)
    inner join Sucursal s on(s.CodSucursal = es.Sucursal)
    where es.activa = 1
    and es.Id not in(
    select Id from Especialidades where RangoEtario = 3 and CodSiat in(8, 91) --No muestra psicologia con rango etario todos
    )
    and es.Id not in(
    select Id from Especialidades where CodSiat in(9) -- No nuestra psiquiatria por el momento
    )
    and s.ToLink = '${ toLink }'
    order by es.CodSiat asc, re.Id asc`

    const data = await simpleQuery(qry);

    return data
}


module.exports = {
    getSucursalByToLink,
    getEspecialidadByToLink,
    getCharlaByToLink,
    getSucursal,
    getEspecialidadesBySucursal
}