const { response } = require("express");
const { query, buildParams } = require("../database/sql-connection");
const { simpleQuery } = require("../database/simpleQuery")
const { existeSucursal } = require("../helpers/db-validators")
const { getEspecialidadesBySucursal } = require("../helpers/db-queries")



const getSucursales = async (req, res = response) => {

    var params = [];
    var sql = "select * from Sucursal order by Orden";

    await query(params, sql, undefined, result => {
        res.json({
            result
        })
    });

}

const getSucursal = async (req, res = response) => {

    const toLink = req.params.toLink
    const {  
        addImagenes, 
        addImagenPrincipal, 
        addEspecialidades,
        addRangosEtarios 
    } = req.body

    // console.log(req.body)

    if (!await existeSucursal(undefined, toLink)){
        return res.status(400).json({
            msg: 'No existe la sucursal'
        })
    }

    const qrySucursal = `select s.CodSucursal, s.Nombre, s.DireccionAbreviada, s.DireccionReferencia, s.Telefono, s.Email, s.GoogleMapPlaceId, s.Horario, s.ToLink, s.DatabaseName, smt.Content as MetaTitle from Sucursal s
    inner join SucursalMetaTitle smt on(smt.CodSucursal = s.CodSucursal)
    where ToLink ='${ toLink }'`
    const sucursal = await simpleQuery(qrySucursal); // Busca Sucursal

    if(addImagenes){
        const qryImagenes = `
        SELECT CodImagen, Imagen FROM SucursalImagenes si 
        INNER JOIN Sucursal s on (s.CodSucursal = si.CodSucursal)
        where si.Vigente = 1 and si.EsImagenPrincipal = 0 and s.ToLink = '${ toLink }' order by si.orden`
        const Imagenes = await simpleQuery(qryImagenes); // Busca imagenes asociadas
        sucursal[0].Imagenes = Imagenes // Añade imagenes
    }
    if(addImagenPrincipal){
        const qryImagenPrincipal = `
        SELECT TOP 1 CodImagen, Imagen FROM SucursalImagenes si 
        INNER JOIN Sucursal s on (s.CodSucursal = si.CodSucursal)
        where si.Vigente = 1 and si.EsImagenPrincipal = 1 and s.ToLink = '${ toLink }'`
        const ImagenPrincipal = await simpleQuery(qryImagenPrincipal); // Busca imagen principal
        sucursal[0].ImagenPrincipal = ImagenPrincipal // Añade imagen principal
    }
    if(addRangosEtarios){
        const qryRangosEtarios = `select CodRangoEdad, NombreRangoEdad from RangoEdades_${ sucursal[0].DatabaseName }`
        const RangosEtarios = await simpleQuery(qryRangosEtarios)
        sucursal[0].RangosEtarios = RangosEtarios
    }
    if(addEspecialidades){
        sucursal[0].Especialidades = await getEspecialidadesBySucursal(sucursal[0].ToLink)
    }

    res.json({
       result: sucursal
    })

}



module.exports = {
    getSucursales,
    getSucursal,
}