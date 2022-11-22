const { response } = require("express");
const { query, buildParams } = require("../database/sql-connection");



const getArancelesBySucursal = async (req, res = response) => {

    const { sucursal } = req.params

    let params = [];
    var sql = `select distinct 
    ar.CodSiat, 
    es.Nombre as NombreEspecialidad, 
    ar.ValorPrimera,
    re.Id,
    case re.Id when 2 then 'Niños y Adolescentes' else re.Nombre end as NombreRangoEtario, 
    ar.Orden from Aranceles ar
    inner join especialidades es on(es.CodSiat = ar.CodSiat)
    inner join RangoEtario re on(re.Id = ar.RangoEtarioId)
    where ar.CodSucursal = ${ sucursal }
    ORDER BY ar.Orden asc, re.Id desc`;

    await query(params, sql, undefined, result => {
        res.json({
            result
        })
    });

}


module.exports = {
    getArancelesBySucursal
}