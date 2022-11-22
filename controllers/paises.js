const { response } = require("express");
const { query, buildParams } = require("../database/sql-connection");



const getPaises = async (req, res = response) => {

    var params = [];
    var sql = "select * from Paises";

    await query(params, sql, undefined, result => {
        res.json({
            result
        })
    });

}


module.exports = {
    getPaises
}