const { response } = require("express");
const { query, buildParams } = require("../database/sql-connection");
const { simpleQuery } = require("../database/simpleQuery")


const getMensajeSitio = async (req, res = response) => {

    var params = [];
    var sql = "select Id, Titulo, Contenido, Activo from MensajeSitio where Id = 1";

    await query(params, sql, undefined, result => {
        res.json({
            result
        })
    });

}


const updateMensajeSitio = async (req, res = response) => {

    const { Titulo, Contenido, ...rest } = req.body

    const Activo = Number(rest.Activo)

    await simpleQuery(`update MensajeSitio set Titulo='${ Titulo }', Contenido = '${ Contenido }', Activo = ${ Activo }`)
    // const mensajeSitio = await simpleQuery('select distinct Id, Titulo, Contenido, Activo from MensajeSitio')

    res.status(201).json({
        msg: 'Actualizado!'
    })

}



module.exports = {
    getMensajeSitio,
    updateMensajeSitio,
}