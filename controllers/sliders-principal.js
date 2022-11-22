const { response } = require("express");
const { simpleQuery } = require("../database/simpleQuery");
const { query, buildParams } = require("../database/sql-connection");
const { cldUpload, cldDestroy} = require("../helpers/cloudinary")
const { sanitizeHtmlText } = require("../helpers")

const getSlidersPrincipal = async (req, res = response) => {
    var params = [];
    var sql = `select Id, Texto, Imagen, HrefLink, ImagenMobile, ToLink, FechaHoraCreacion, FechaHoraModificacion, Orden from SlidersPrincipal where Vigente = 1 order by Id desc`;

    await query(params, sql, undefined, result => {
        res.json({
            result
        })  
    })
}

const getSliderPrincipal = async (req, res = response) => {
    const { id } = req.params
    var params = [];
    var sql = `select Id, Texto, Imagen, ImagenMobile, HrefLink, ToLink, Orden, Vigente, FechaHoraCreacion, FechaHoraModificacion
    from SlidersPrincipal where id = ${ id } order by orden asc`;

    await query(params, sql, undefined, result => {
        res.json({
            result
        })  
    })
}

const createSliderPrincipal = async (req, res = response) => {

    const { orden, ...rest } = req.body

    const nombreImagen = sanitizeHtmlText(rest.nombreImagen)
    const nombreImagenMobile = sanitizeHtmlText(rest.nombreImagenMobile)
    const texto = sanitizeHtmlText(rest.texto)
    const hrefLink = sanitizeHtmlText(rest.hrefLink)
    const toLink = sanitizeHtmlText(rest.toLink)

    let versionImagen = ''

    if(req.files){
        const { imagen, imagenMobile } = req.files
        if(imagen){
            let upload = await cldUpload('terapiacl/sliders/principal', nombreImagen, imagen.tempFilePath)
            versionImagen = upload.version
        }
        if(imagenMobile){
            let upload = await cldUpload('terapiacl/sliders-mobile/principal', nombreImagenMobile, imagenMobile.tempFilePath)
            versionImagen = upload.version
        }
        await simpleQuery(`update cloudinaryversion set Timestamp = ${ versionImagen }`) /* actualiza version de cloudinary */
    }

    const qry = `insert into SlidersPrincipal values('', '${ texto }', '${ nombreImagen }', getdate(), '', ${ orden }, 1,  '${ hrefLink }', '${ toLink }', '${ nombreImagenMobile }')`
    await simpleQuery(qry)
    
    const Id = await simpleQuery(`select MAX(Id) as Id from SlidersPrincipal`)
    const Slider = await simpleQuery(`select Id, Texto, Imagen, ImagenMobile, HrefLink, ToLink, Orden, Vigente, FechaHoraCreacion, FechaHoraModificacion from SlidersPrincipal where Vigente = 1 and Id = ${ Id[0].Id }`)

    res.status(201).json({
        msg: 'creado!!',
        Slider
    })
}

const updateSliderPrincipal = async (req, res = response) => {

    const { id, orden, ...rest } = req.body

    const nombreImagen = sanitizeHtmlText(rest.nombreImagen)
    const nombreImagenMobile = sanitizeHtmlText(rest.nombreImagenMobile)
    const texto = sanitizeHtmlText(rest.texto)
    const hrefLink = sanitizeHtmlText(rest.hrefLink)
    const toLink = sanitizeHtmlText(rest.toLink)

    let imgUpdateStr = ''
    let versionImagen = ''
  
    if(req.files){

        /* Busca imagenes actuales */
        let [slider] = await simpleQuery(`select Imagen as CurrentImagen, ImagenMobile as CurrentImagenMobile from SlidersPrincipal where Id = ${ id } `)
        const { CurrentImagen, CurrentImagenMobile } = slider
        /* Recoge imagenes subidas */
        const { imagen, imagenMobile } = req.files

        if(imagen){
            await cldDestroy('terapiacl/sliders/principal', CurrentImagen)
            let upload = await cldUpload('terapiacl/sliders/principal', nombreImagen, imagen.tempFilePath)
            versionImagen = upload.version
            imgUpdateStr += `, Imagen = '${ nombreImagen }'`
        }
        if(imagenMobile){
            await cldDestroy('terapiacl/sliders-mobile/principal', CurrentImagenMobile)
            let upload = await cldUpload('terapiacl/sliders-mobile/principal', nombreImagenMobile, imagenMobile.tempFilePath)
            versionImagen = upload.version
            imgUpdateStr += `, ImagenMobile = '${ nombreImagenMobile }'`
        }
        await simpleQuery(`update cloudinaryversion set Timestamp = ${ versionImagen }`) /* actualiza version de cloudinary */
    }

    let query = `update SlidersPrincipal set 
    Texto = '${ texto }', 
    HrefLink = '${ hrefLink }', 
    ToLink = '${ toLink }', 
    Orden = ${ orden },
    FechaHoraModificacion = getdate()`
    query += imgUpdateStr
    query += ` where Id = ${ id }`

    await simpleQuery(query)

    const Slider = await simpleQuery(`select Id, Texto, Imagen, ImagenMobile, HrefLink, ToLink, Orden, Vigente, FechaHoraCreacion, FechaHoraModificacion from SlidersPrincipal where Vigente = 1 and Id = ${ id }`)

    res.json({
        msg: 'update!!',
        Slider
    })
}

const deleteSliderPrincipal = async (req, res = response) => {

    const { id } = req.params
    const [Slider] = await simpleQuery(`select Imagen, ImagenMobile from SlidersPrincipal where Id = ${ id }`)
    const { Imagen, ImagenMobile } = Slider

    await cldDestroy('terapiacl/sliders/principal', Imagen)
    await cldDestroy('terapiacl/sliders-mobile/principal', ImagenMobile)
    await simpleQuery(`update SlidersPrincipal set Vigente = 0 where Id = ${ id }`)
    
    res.json({
        id
    })
}


module.exports = {
    getSlidersPrincipal,
    getSliderPrincipal,
    createSliderPrincipal,
    updateSliderPrincipal,
    deleteSliderPrincipal
}