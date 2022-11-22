const { response } = require("express");
const { query, buildParams } = require("../database/sql-connection");
const { simpleQuery } = require("../database/simpleQuery")
const { sanitizeHtmlText } = require("../helpers")


const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);


const getProblema = async (req, res = response) => {

    const { toLink, codProblema, addMetaTitle } = req.body
    let sql = `select CodProblema, NombreProblema, Descripcion, Imagen, ToLink from Problema where vigente = 1`
    if(codProblema){
        sql += `and CodProblema = '${ codProblema }'`
    }else{
        sql += `and ToLink = '${ toLink }'`
    }

    let problema = await simpleQuery(sql)
    
    if(codProblema && addMetaTitle === true){
        metaTitle = await simpleQuery(`select * from ProblemaMetaTitle where Activo = 1 and CodProblema = ${ codProblema }`)
        if(metaTitle.length > 0){
            problema[0].MetaTitle = metaTitle[0].Content
        }
    }

    res.json({
        problema
    })

}

const getProblemas = async (req, res = response) => {

    const { codTipoProblema } = req.body

    let problemas = []
    const arrProblemasTodos =  await simpleQuery(`select CodProblema, NombreProblema,  null as checked from Problema where Vigente = 1 order by CodProblema desc`);

    if(codTipoProblema){

        let qryProblemasAsociados = `select p.CodProblema, p.NombreProblema from Problema p 
        inner join TipoProblemaProblema tpp on (tpp.CodProblema = p.CodProblema)
        where Vigente = 1
        and tpp.CodTipoProblema = ${ codTipoProblema }`

        const problemasAsociados = await simpleQuery(qryProblemasAsociados);

        arrProblemasTodos.map((item) => {
            item.checked = false
            if(problemasAsociados.find(problema => problema.CodProblema === item.CodProblema)){
                 item.checked = true
            }
            problemas.push(item)
         })
 
    }else{
        problemas = arrProblemasTodos
    }

    res.json({
        problemas
    })

}

const createProblema = async (req, res = response) => {

    const {
        ToLink,
        MetaTitle,
        ...rest
      } = req.body

    // Sanitizamos entradas de texto
    const NombreProblema = sanitizeHtmlText(rest.NombreProblema)
    const Descripcion = sanitizeHtmlText(rest.Descripcion)

    let Imagen = ''

    if(req.files){
        const { tempFilePath } = req.files.Imagen
        const nombreImagen = NombreProblema.toLowerCase().split(" ").join("-") // Como nombre dejamos el nombre del Tipo de Problema separado con guiones, ej: problemas-familiares
        cloudinary.uploader.destroy(`terapiacl/problemas/${ nombreImagen }`) //Quita imagen previa (si existe)

        let { public_id, version } = await cloudinary.uploader.upload(tempFilePath, 
        {folder: "terapiacl/problemas/", 
            public_id: nombreImagen
        })
        arr_public_id = public_id.split('/')
        Imagen = arr_public_id[arr_public_id.length-1]
        await simpleQuery(`update cloudinaryversion set Timestamp = ${ version }`) /* actualiza version de cloudinary */
    }

    await simpleQuery(`insert into Problema values('${ NombreProblema }', 1, '${ Descripcion }', '${ Imagen }', '${ ToLink }')`)
    
    const CodProblema = await simpleQuery(`select MAX(CodProblema) as CodProblema from Problema`)
    const Problema = await simpleQuery(`select CodProblema, NombreProblema, null as checked from Problema where CodProblema = ${ CodProblema[0].CodProblema }`)

    if(MetaTitle){
        await simpleQuery(`insert into ProblemaMetaTitle values(${ CodProblema[0].CodProblema },' ${ MetaTitle }', 1)`)
    }

    res.json({
        msg: 'creado!!',
        Problema
    })
}

const deleteProblema = async (req, res = response) => {

    const { CodProblema } = req.params

    const [Problema] = await simpleQuery(`select Imagen from Problema where CodProblema = ${ CodProblema }`)
    const nombreImagen = Problema.Imagen

    // console.log(CodProblema)
    // console.log(nombreImagen)
    cloudinary.uploader.destroy(`terapiacl/problemas/${ nombreImagen }`) // Quita imagen (si existe)

    await simpleQuery(`delete ProblemaMetaTitle where CodProblema = ${ CodProblema }`)
    await simpleQuery(`delete Problema where CodProblema = ${ CodProblema }`)

    res.status(200).json({
        msg: 'delete !!',
        CodProblema
    })
}

const updateProblema = async (req, res = response) => {

    const {
        CodProblema,
        ToLink,
        MetaTitle,
        ...rest
    } = req.body

    // Sanitizamos entradas de texto
    const NombreProblema = sanitizeHtmlText(rest.NombreProblema)
    const Descripcion = sanitizeHtmlText(rest.Descripcion)

    let strImagen = ''

    if(req.files){
        const problemaBefore = await simpleQuery(`select Imagen from Problema where CodProblema = ${ CodProblema }`)
        const nombreImagenBefore = problemaBefore[0].Imagen
        const { tempFilePath } = req.files.Imagen
        const nombreImagen = NombreProblema.toLowerCase().split(" ").join("-") // Como nombre dejamos el nombre del Tipo de Problema separado con guiones, ej: problemas-familiares
        cloudinary.uploader.destroy(`terapiacl/problemas/${ nombreImagenBefore }`) // Quita imagen previa (si existe)

        const { public_id, version } = await cloudinary.uploader.upload(tempFilePath, 
        {folder: "terapiacl/problemas/", 
            public_id: nombreImagen
        })
        arr_public_id = public_id.split('/')
        strImagen = `, Imagen = '${ arr_public_id[arr_public_id.length-1] }' `
        await simpleQuery(`update cloudinaryversion set Timestamp = ${ version }`) /* actualiza version de cloudinary */
    }


    let sql = `update Problema set
    NombreProblema = '${ NombreProblema }',
    Descripcion = '${ Descripcion }',
    ToLink = '${ ToLink }'`
    +strImagen /*Agrega imagen*/
    +`where CodProblema = ${ CodProblema }`


    await simpleQuery(sql)
    
    if(MetaTitle){
        await simpleQuery(`delete ProblemaMetaTitle where CodProblema = ${ CodProblema }`)
        await simpleQuery(`insert into ProblemaMetaTitle values(${ CodProblema }, '${ MetaTitle }', 1)`)
    }

    res.status(200).json({
        msg:'update!!',
        CodProblema,
    })

}

module.exports = {
    getProblemas,
    getProblema,
    createProblema,
    deleteProblema,
    updateProblema,
}