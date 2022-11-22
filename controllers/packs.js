const { response } = require("express");
const { query, buildParams } = require("../database/sql-connection");



const getPacksBySucursal = async (req, res = response) => {

    const { sucursal } = req.params

    let params = [];
    var sql = `select distinct e.CodSiat, e.Nombre as NombreEspecialidad, pd.Cantidad as CantidadSesiones, p.PorcentajeDescuento, p.PrecioFinal, 
    REPLACE(a.ValorPrimera, '.', '') * pd.Cantidad as PrecioInicial,
    a.Orden
    from Pack p 
    inner join Pack_Detalle pd on (p.CodPack = pd.CodPack)
    inner join Especialidades e on(pd.CodEspecialidad = e.CodSiat)
    inner join Aranceles a on(a.CodSiat = e.CodSiat)
    where p.CodSucursal = ${ sucursal }
    and a.CodSucursal = ${ sucursal }
    and pd.CodSucursal = ${ sucursal }
    and p.Vigente = 1
    and DisponibleWeb = 1
    order by a.Orden asc
    `;

    await query(params, sql, undefined, result => {
        res.json({
            result
        })
    });

}


module.exports = {
    getPacksBySucursal
}