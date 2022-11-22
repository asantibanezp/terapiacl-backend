const { response } = require("express");
const { query, buildParams } = require("../database/sql-connection");
const { simpleQuery } = require("../database/simpleQuery")
const { sanitizeHtmlText } = require("../helpers")

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);


const getTipos = async (req, res = response) => {

    const { fromAdmin } = req.body
    var params = [];
    var sql = "select CodTipoProblema, NombreTipoProblema, ToLink from TipoProblema where Vigente = 1";

    if(fromAdmin){
        sql += " order by CodTipoProblema desc"
    }

    await query(params, sql, undefined, result => {
        res.json({
            result
        })
    });

}

const getTipo = async(req, res = response) => {

    const { toLink, codTipoProblema, fromAdmin } = req.body

    let sql = `select
    p.NombreProblema,
    p.ToLink as ToLinkProblema,
    p.CodProblema,
    tp.NombreTipoProblema as TP_Nombre,
    tp.ToLink as TP_ToLink,
    tp.CodTipoProblema as TP_CodTipoProblema,
    tp.Imagen as TP_Imagen,
    tp.Descripcion as TP_Descripcion,
    tp.Tratamiento as TP_Tratamiento,
    tp.Causas as TP_Causas,
    tp.ProblemasTitulo as TP_ProblemasTitulo,
    tp.TratamientoTitulo as TP_TratamientoTitulo,
    tp.CausasTitulo as TP_CausasTitulo,
    tpmt.Content as TP_MetaTitle
    from Problema p
    inner join TipoProblemaProblema tpp on(tpp.CodProblema = p.CodProblema)
    inner join TipoProblema tp on(tp.CodTipoProblema = tpp.CodTipoProblema)
    inner join TipoProblemaMetaTitle tpmt on(tpmt.CodTipoProblema = tp.CodTipoProblema)
    where p.Vigente = 1 ` 
    
    if(codTipoProblema){
        sql += `and tp.CodTipoProblema = ${ codTipoProblema }`
    }else{
        sql += `and tp.ToLink = '${ toLink }'`
    }

    const data = await simpleQuery(sql)
    const tipoProblema = {
        nombre: data[0].TP_Nombre,
        toLink: data[0].TP_ToLink,
        CodTipoProblema: data[0].TP_CodTipoProblema,
        imagen: data[0].TP_Imagen,
        descripcion: data[0].TP_Descripcion,
        tratamiento: data[0].TP_Tratamiento,
        causas: data[0].TP_Causas,
        problemasTitulo: data[0].TP_ProblemasTitulo,
        tratamientoTitulo: data[0].TP_TratamientoTitulo,
        causasTitulo: data[0].TP_CausasTitulo,
        metaTitle: data[0].TP_MetaTitle,
    }

   
    let otros = {}

    if(fromAdmin){ // Para el admin solo devuelve información del Tipo de Problema
        res.json({
            tipoProblema
        })
    }else{ // Para la web adosa los Problemas Asociados y los demás Tipos de Problema
        const problemas = []
        data.map((item, i) => {
            let problema = {
                nombre: item.NombreProblema,
                toLink: item.ToLinkProblema,
                codProblema: item.CodProblema
            }
            problemas.push(problema)
        })

        const tipoProblemaOtros = await simpleQuery(`select NombreTipoProblema, ToLink from TipoProblema where Vigente = 1 and ToLink <> '${ toLink }'`)
        otros = {
            problemas,
            tipoProblemaOtros
        }
        res.json({
            tipoProblema,
            otros
        })
    }


}

const createTipo = async (req, res = response) => {

    const {
        toLink,
        metaTitle,
        problemas,
        ...rest
      } = req.body

      // Sanitizamos entradas de texto
      const nombre = sanitizeHtmlText(rest.nombre)
      const descripcion = sanitizeHtmlText(rest.descripcion)
      const tratamiento = sanitizeHtmlText(rest.tratamiento)
      const causas = sanitizeHtmlText(rest.causas)
      const problemasTitulo = sanitizeHtmlText(rest.problemasTitulo)
      const tratamientoTitulo = sanitizeHtmlText(rest.tratamientoTitulo)
      const causasTitulo = sanitizeHtmlText(rest.causasTitulo)

      let imagen = ''
      let problemasArr = problemas !== '' ? problemas.split(',') : []


      if(req.files){
        const { tempFilePath } = req.files.imagen
        const nombreImagen = nombre.toLowerCase().split(" ").join("-") // Como nombre dejamos el nombre del Tipo de Problema separado con guiones, ej: problemas-familiares
        const { public_id, version } = await cloudinary.uploader.upload(tempFilePath, 
        {folder: "terapiacl/tipos-problemas/", 
            public_id: nombreImagen
        })
        arr_public_id = public_id.split('/')
        imagen = arr_public_id[arr_public_id.length-1]
        await simpleQuery(`update cloudinaryversion set Timestamp = ${ version }`) /* actualiza version de cloudinary */
      }

    await simpleQuery(`insert into TipoProblema values('${ nombre }', 1, '${ descripcion }', '${ imagen }', '${ toLink }', '${ tratamiento }', null, '${ tratamientoTitulo }', '${ problemasTitulo }', '${ causas }', '${ causasTitulo }')`)
    const CodTipoProblema = await simpleQuery(`select MAX(CodTipoProblema) as CodTipoProblema from TipoProblema`)
    const TipoProblema = await simpleQuery(`select CodTipoProblema, NombreTipoProblema, ToLink from TipoProblema where Vigente = 1 and CodTipoProblema = ${ CodTipoProblema[0].CodTipoProblema }`)
   
    if(metaTitle){
        await simpleQuery(`insert into TipoProblemaMetaTitle values(${ CodTipoProblema[0].CodTipoProblema }, '${ metaTitle }', 1)`)
    }

    if(problemasArr.length > 0){ 
        for(i = 0; i < problemasArr.length; i++ ){
            await simpleQuery(`insert into TipoProblemaProblema values(${ problemasArr[i] }, ${ CodTipoProblema[0].CodTipoProblema } )`)
        }
    }

    res.json({
        msg:'creado!!',
        TipoProblema
    })

}

const updateTipo = async (req, res = response) => {

    const {
        codTipoProblema,
        toLink,
        metaTitle,
        problemas,
        ...rest
    } = req.body

    // Sanitizamos entradas de texto
    const nombre = sanitizeHtmlText(rest.nombre)
    const descripcion = sanitizeHtmlText(rest.descripcion)
    const tratamiento = sanitizeHtmlText(rest.tratamiento)
    const causas = sanitizeHtmlText(rest.causas)
    const problemasTitulo = sanitizeHtmlText(rest.problemasTitulo)
    const tratamientoTitulo = sanitizeHtmlText(rest.tratamientoTitulo)
    const causasTitulo = sanitizeHtmlText(rest.causasTitulo)

      let strImagen = ''
      let problemasArr = problemas !== '' ? problemas.split(',') : []

      if(req.files){
        const tipoProblemaBefore = await simpleQuery(`select Imagen from TipoProblema where CodTipoProblema = ${ codTipoProblema }`)
        const nombreImagenBefore = tipoProblemaBefore[0].Imagen
        const { tempFilePath } = req.files.imagen
        const nombreImagen = nombre.toLowerCase().split(" ").join("-") // Como nombre dejamos el nombre del Tipo de Problema separado con guiones, ej: problemas-familiares
        cloudinary.uploader.destroy(`terapiacl/tipos-problemas/${ nombreImagenBefore }`) //Quita imagen previa (si existe)
    
        const { public_id, version } = await cloudinary.uploader.upload(tempFilePath, 
        {folder: "terapiacl/tipos-problemas/", 
            public_id: nombreImagen
        })
        arr_public_id = public_id.split('/')
        strImagen = `, Imagen = '${ arr_public_id[arr_public_id.length-1] }'`
        await simpleQuery(`update cloudinaryversion set Timestamp = ${ version }`) /* actualiza version de cloudinary */
      }

    let sql = `update TipoProblema set 
    NombreTipoProblema = '${ nombre }', 
    Descripcion = '${ descripcion }', 
    ToLink = '${ toLink }', 
    Tratamiento = '${ tratamiento }', 
    Alias = null, 
    TratamientoTitulo = '${ tratamientoTitulo }', 
    ProblemasTitulo = '${ problemasTitulo }', 
    Causas = '${ causas }', 
    CausasTitulo = '${ causasTitulo }' `
    +strImagen /*Agrega imagen*/
    +`where CodTipoProblema = ${ codTipoProblema }`
   
    await simpleQuery(sql)
    
    if(metaTitle){
        await simpleQuery(`delete TipoProblemaMetaTitle where CodTipoProblema = ${ codTipoProblema }`)
        await simpleQuery(`insert into TipoProblemaMetaTitle values(${ codTipoProblema }, '${ metaTitle }', 1)`)
    }

    if(problemasArr.length > 0){
        await simpleQuery(`delete TipoProblemaProblema where CodTipoProblema = ${ codTipoProblema }`)
        for(i = 0; i < problemasArr.length; i++ ){
            await simpleQuery(`insert into TipoProblemaProblema values(${ problemasArr[i] }, ${ codTipoProblema } )`)
        }
    }

    res.status(200).json({
        msg:'update!!',
        codTipoProblema,
    })

}

const deleteTipo = async (req, res = response) => {

    const { codTipoProblema } = req.params

    const [tipoProblema] = await simpleQuery(`select Imagen from TipoProblema where CodTipoProblema = ${ codTipoProblema }`)
    const nombreImagen = tipoProblema.Imagen
    cloudinary.uploader.destroy(`terapiacl/tipos-problemas/${ nombreImagen }`) // Quita imagen (si existe)

    await simpleQuery(`delete TipoProblemaMetaTitle where CodTipoProblema = ${ codTipoProblema }`)
    await simpleQuery(`delete TipoProblemaProblema where CodTipoProblema = ${ codTipoProblema }`)
    await simpleQuery(`delete TipoProblema where CodTipoProblema = ${ codTipoProblema }`)

    res.status(200).json({
        msg: 'delete !!',
        codTipoProblema
    })
}


module.exports = {
    getTipos,
    getTipo,
    updateTipo,
    createTipo,
    deleteTipo
}