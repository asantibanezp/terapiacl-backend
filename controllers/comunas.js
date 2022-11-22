const { response } = require("express");
const { query, buildParams } = require("../database/sql-connection");



const getComunas = async (req, res = response) => {

    var params = [];
    var sql = "select * from Comuna where codciudad = 46 order by nombrecomuna asc";

    await query(params, sql, undefined, result => {
        res.json({
            result
        })
    });

}


module.exports = {
    getComunas
}