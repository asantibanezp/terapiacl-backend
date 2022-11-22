const { response } = require("express");
const { query, buildParams } = require("../database/sql-connection");
const { getSucursal } = require("../helpers")



const getRangosEtariosSiat = async (req, res = response) => {

    const { codSucursal } = req.body

    let arr_sucursal = []

    if(codSucursal != null){
        arr_sucursal = await getSucursal(codSucursal)
        if(!arr_sucursal){
            return res.status(400).json({
                msg: 'No existe sucursal'
            })
        }
    }else{
        return res.status(400).json({
            msg: 'Sin parámetros'
        })
    }

    var params = [];
    var sql = `select CodRangoEdad, NombreRangoEdad from RangoEdades_${ arr_sucursal[0].DatabaseName }`;
    // console.log(sql)

    await query(params, sql, undefined, result => {
        res.json({
            result
        })
    });

}


module.exports = {
    getRangosEtariosSiat
}