const { response } = require("express");
const { query, buildParams } = require("../database/sql-connection");



const getCldVersion = async (req, res = response) => {

    var params = [];
    var sql = "select distinct Timestamp from CloudinaryVersion";

    await query(params, sql, undefined, result => {
        res.json({
            timestamp: result[0].Timestamp
        })
    });

}


module.exports = {
    getCldVersion
}