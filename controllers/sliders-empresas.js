const { response } = require("express");
const { simpleQuery } = require("../database/simpleQuery");
const { query, buildParams } = require("../database/sql-connection");
const { cldUpload, cldDestroy} = require("../helpers/cloudinary")
const { sanitizeHtmlText } = require("../helpers")

const getSlidersEmpresas = async (req, res = response) => {
    var params = [];
    var sql = `select Id, Imagen, HrefLink, ImagenMobile, ToLink, FechaHoraCreacion, FechaHoraModificacion, Orden from SlidersEmpresas where Vigente = 1 order by Id desc`;

    await query(params, sql, undefined, result => {
        res.json({
            result
        })  
    })
}

const getSliderEmpresas = async (req, res = response) => {
    const { id } = req.params
    var params = [];
    var sql = `select Id, Imagen, ImagenMobile, HrefLink, ToLink, Orden, Vigente, FechaHoraCreacion, FechaHoraModificacion
    from SlidersEmpresas where id = ${ id } order by orden asc`;

    await query(params, sql, undefined, result => {
        res.json({
            result
        })  
    })
}

const createSliderEmpresas = async (req, res = response) => {

    const { orden, ...rest } = req.body

    const nombreImagen = sanitizeHtmlText(rest.nombreImagen)
    const nombreImagenMobile = sanitizeHtmlText(rest.nombreImagenMobile)
    const hrefLink = sanitizeHtmlText(rest.hrefLink)
    const toLink = sanitizeHtmlText(rest.toLink)

    let versionImagen = ''

    if(req.files){
        const { imagen, imagenMobile } = req.files
        if(imagen){
            let upload = await cldUpload('terapiacl/sliders/empresas', nombreImagen, imagen.tempFilePath)
            versionImagen = upload.version
        }
        if(imagenMobile){
            let upload = await cldUpload('terapiacl/sliders-mobile/empresas', nombreImagenMobile, imagenMobile.tempFilePath)
            versionImagen = upload.version
        }
        await simpleQuery(`update cloudinaryversion set Timestamp = ${ versionImagen }`) /* actualiza version de cloudinary */
    }

    await simpleQuery(`insert into SlidersEmpresas values('', '', '${ nombreImagen }', getdate(), '', ${ orden }, 1,  '${ hrefLink }', '${ toLink }', '${ nombreImagenMobile }')`)
    const Id = await simpleQuery(`select MAX(Id) as Id from SlidersEmpresas`)
    const Slider = await simpleQuery(`select Id, Imagen, ImagenMobile, HrefLink, ToLink, Orden, Vigente, FechaHoraCreacion, FechaHoraModificacion from SlidersEmpresas where Vigente = 1 and Id = ${ Id[0].Id }`)
    

    res.status(201).json({
        msg: 'creado!!',
        Slider
    })
}

const updateSliderEmpresas = async (req, res = response) => {

    const { id, orden, ...rest } = req.body

    const nombreImagen = sanitizeHtmlText(rest.nombreImagen)
    const nombreImagenMobile = sanitizeHtmlText(rest.nombreImagenMobile)
    const hrefLink = sanitizeHtmlText(rest.hrefLink)
    const toLink = sanitizeHtmlText(rest.toLink)

    let imgUpdateStr = ''
    let versionImagen = ''
  
    if(req.files){

        /* Busca imagenes actuales */
        let [slider] = await simpleQuery(`select Imagen as CurrentImagen, ImagenMobile as CurrentImagenMobile from SlidersEmpresas where Id = ${ id } `)
        const { CurrentImagen, CurrentImagenMobile } = slider
        /* Recoge imagenes subidas */
        const { imagen, imagenMobile } = req.files

        if(imagen){
            await cldDestroy('terapiacl/sliders/empresas', CurrentImagen)
            let upload = await cldUpload('terapiacl/sliders/empresas', nombreImagen, imagen.tempFilePath)
            versionImagen = upload.version
            imgUpdateStr += `, Imagen = '${ nombreImagen }'`
        }
        if(imagenMobile){
            await cldDestroy('terapiacl/sliders-mobile/empresas', CurrentImagenMobile)
            let upload = await cldUpload('terapiacl/sliders-mobile/empresas', nombreImagenMobile, imagenMobile.tempFilePath)
            versionImagen = upload.version
            imgUpdateStr += `, ImagenMobile = '${ nombreImagenMobile }'`
        }
        await simpleQuery(`update cloudinaryversion set Timestamp = ${ versionImagen }`) /* actualiza version de cloudinary */
    }

    let query = `update SlidersEmpresas set 
    HrefLink = '${ hrefLink }', 
    ToLink = '${ toLink }', 
    Orden = ${ orden },
    FechaHoraModificacion = getdate()`
    query += imgUpdateStr
    query += ` where Id = ${ id }`

    await simpleQuery(query)
    const Slider = await simpleQuery(`select Id, Imagen, ImagenMobile, HrefLink, ToLink, Orden, Vigente, FechaHoraCreacion, FechaHoraModificacion from SlidersEmpresas where Vigente = 1 and Id = ${ id }`)

    res.json({
        msg: 'update!!',
        Slider
    })
}

const deleteSliderEmpresas = async (req, res = response) => {

    const { id } = req.params
    const [Slider] = await simpleQuery(`select Imagen, ImagenMobile from SlidersEmpresas where Id = ${ id }`)
    const { Imagen, ImagenMobile } = Slider

    await cldDestroy('terapiacl/sliders/empresas', Imagen)
    await cldDestroy('terapiacl/sliders-mobile/empresas', ImagenMobile)
    await simpleQuery(`update SlidersEmpresas set Vigente = 0 where Id = ${ id }`)
    
    res.json({
        id
    })
}


module.exports = {
    getSlidersEmpresas,
    getSliderEmpresas,
    createSliderEmpresas,
    updateSliderEmpresas,
    deleteSliderEmpresas
}