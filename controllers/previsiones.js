const { response } = require("express");
const { simpleQuery } = require("../database/simpleQuery")
const { query, buildParams } = require("../database/sql-connection");



const getPrevisiones = async (req, res = response) => {

    var params = [];
    var sql = "select * from prevision where activa = 1 order by nombre asc";

    await query(params, sql, undefined, result => {
        res.json({
            result
        })
    });

}

const getPrevisionesConvenios = async (req, res = response) => {

    const sqlPrevisiones = "select Id, Imagen, Nombre from Prevision where activa = 1 and Id not in(12, 99) order by Nombre";
    const sqlEspecialidades = `select distinct ci.PrevisionId, ci.EspecialidadId, e.nombre as NombreEspecialidad, ci.BonoDigital, e.orden from ConvenioIsapre ci 
    inner join Prevision p on (ci.previsionId = p.Id)
    inner join Especialidades e on(e.CodSiat = ci.especialidadid)
    where ci.PrevisionId not in(12)
    --and ci.PrevisionId = 8
    order by e.orden asc
     `
    const previsiones = await simpleQuery(sqlPrevisiones)
    const especialidades = await simpleQuery(sqlEspecialidades)
    const result = []

    previsiones.map((prev) => {
 
        let arr_esp = especialidades.filter((espe) => espe.PrevisionId === prev.Id)
        // let especialidadesSinImed = arr_esp.filter((item) => item.BonoDigital === 0) // Busca especialidades Sin Imed
        
        prevision = { // Creamos objeto de previsión añadiéndole un arreglo con sus especialidades asociadas
            Id: prev.Id,
            Nombre: prev.Nombre,
            Imagen: prev.Imagen,
            BonoDigital: prev.BonoDigital,
            // TieneEspecialidadesSinImed: especialidadesSinImed.length > 0 ? true : false,
            Especialidades: arr_esp,
        }

        result.push(prevision)
  
    })

    res.status(200).json({
        result
    })

}

//*********************** QUERY A LA ANTIGUA, ES MÁS INEFICIENTE *******************************************
// const getPrevisionesConvenios = async (req, res = response) => {

//     const sqlPrevisiones = "select * from Prevision where activa = 1 and Id not in(12, 99)";

//     const previsiones = await simpleQuery(sqlPrevisiones)

//         for (let i = 0; i < previsiones.length; i++) {

//             const sqlEspecialidades = `select distinct cfi.PrevisionId, cfi.EspecialidadId, e.nombre as NombreEspecialidad from ConvenioFonasaIsapre cfi 
//             left join Prevision p on (cfi.previsionId = p.Id)
//             left join Especialidades e on(e.CodSiat = cfi.especialidadid)
//             where cfi.PrevisionId not in(12)
//             and cfi.PrevisionId = ${ previsiones[i].Id }
//             order by cfi.previsionId asc, cfi.especialidadid asc`

//             const especialidades = await simpleQuery(sqlEspecialidades)

//             previsiones[i].Especialidades = especialidades
//         }

//     res.status(200).json({
//         result: previsiones
//     })

// }



module.exports = {
    getPrevisiones,
    getPrevisionesConvenios
}