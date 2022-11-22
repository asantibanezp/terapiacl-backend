const { response } = require("express");
const { query, buildParams } = require("../database/sql-connection");



const getCiudades = async (req, res = response) => {

    var params = [];
    var sql = "select * from Ciudad";

    await query(params, sql, undefined, result => {
        res.json({
            result
        })
    });

}


module.exports = {
    getCiudades
}