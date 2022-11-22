const { response } = require("express");
const { query, buildParams } = require("../database/sql-connection");
const { simpleQuery } = require("../database/simpleQuery")


const getServicios = async (req, res = response) => {
    let params = [];
    let sql = "select * from servicios where vigente = 1 order by Orden";

    await query(params, sql, undefined, result => {
        res.json({
            result
        })
    });

}

const getEvaluaciones = async (req, res = response) => {
    let params = []
    let sql = `select Titulo, ToLink from Evaluacion order by Orden`

    await query(params, sql, undefined, result => {
        res.json({
            result
        })
    });
}

const getEvaluacion = async (req, res = response) => {
    const { toLink } = req.params
    // let params = []
    
    // Trae Evaluacion
    let evaluacion = await simpleQuery(`select Id, Titulo, Descripcion, TestTitulo, EvaluacionesTitulo, Imagen from Evaluacion where ToLink = '${ toLink }'`)

    if(evaluacion[0].TestTitulo){ // Sólo si tiene título para Tests, va a buscar Tests asociados
        const tests = await simpleQuery(`select t.Id, t.Titulo, t.Descripcion from Test t
        inner join EvaluacionTest et on(et.IdTest = t.Id)
        where et.IdEvaluacion = ${ evaluacion[0].Id }`)
        if(tests.length > 0)
            evaluacion[0].Tests = tests
    }

    if(evaluacion[0].EvaluacionesTitulo){ // Sólo si tiene título para Evaluaciones, va a buscar Evaluaciones asociadas
        const otrasEvaluacionesDelTipo = await simpleQuery(`select * from Evaluacion where EsTipoId = ${ evaluacion[0].Id } and Id <> ${ evaluacion[0].Id }`)
        if(otrasEvaluacionesDelTipo.length > 0)
            evaluacion[0].OtrasEvaluacionesDelTipo = otrasEvaluacionesDelTipo
    }

    res.json({
        evaluacion
    })
}

const getTerapiasIndividuales = async (req, res = response) => {
    let params = []
    let sql = `select Titulo, ToLink from TerapiaIndividual order by Orden`

    await query(params, sql, undefined, result => {
        res.json({
            result
        })
    });
}

const getTerapiaIndividual = async (req, res = response) => {
    const { toLink } = req.params
    let params = []
    let sql = `select Titulo, Descripcion, Imagen from TerapiaIndividual where ToLink = '${ toLink }'`

    await query(params, sql, undefined, result => {
        res.json({
            result
        })
    });
}

module.exports = {
    getServicios,
    getEvaluaciones,
    getEvaluacion,
    getTerapiasIndividuales,
    getTerapiaIndividual
}