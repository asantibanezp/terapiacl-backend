const { response } = require("express");
const { query, buildParams } = require("../database/sql-connection");


const getTestimonios = async (req, res = response) => {

    var params = [];
    var sql = "select CodTestimonio, Autor, Comentario from Testimonios where Activo = 1";

    await query(params, sql, undefined, result => {
        res.json({
            result
        })
    });

}


module.exports = {
    getTestimonios
}