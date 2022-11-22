const { response, json } = require("express");
const { query, buildParams } = require("../database/sql-connection");
const { simpleQuery } = require("../database/simpleQuery");
const { sanitizeHtmlText } = require("../helpers")
var TYPES = require("tedious").TYPES;
// For each param do: db.buildParams(params, "name", TYPES.type, variable)
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const getNoticias = async (req, res = response) => {

    const { desde, limite, bytitle } = req.body;
    let params = [];
    let total = '';
    let sql = '';
    let sqlTotal = '';

    if(bytitle && bytitle.length != 0){

        firstWord = bytitle.shift()

        sql = `select Id, Titulo, Texto, Imagen, Fecha from noticias where Activo = 1 and (Titulo like '%${ firstWord }%'`;
        sqlTotal = `select count(*) as total from noticias where Activo = 1 and (Titulo like '%${ firstWord }%'`;

        bytitle.map(restWord =>{
            sql+=`or Titulo like '%${ restWord }%'`
            sqlTotal+=`or Titulo like '%${ restWord }%'`
        })

        sql += ') order by Id desc offset @desde rows fetch next @limite rows only';
        sqlTotal += ')';
        qryTotal = await simpleQuery(sqlTotal)
        total = qryTotal[0].total

    }else if(desde != undefined && limite != undefined){

        sql = "select Id, Titulo, Texto, Imagen, Fecha from noticias where Activo = 1 order by Id desc offset @desde rows fetch next @limite rows only";
        qryTotal = `SELECT COUNT(id) as total FROM Noticias WHERE Activo = 1`;
        qryTotal = await simpleQuery(qryTotal)
        total = qryTotal[0].total

    }else{
        res.status(400).json({
            result: "Error - No se recibieron parámetros de búsqueda"
        })
    }

    buildParams(params, "desde", TYPES.Int, desde);
    buildParams(params, "limite", TYPES.Int, limite);

    await query(params, sql, undefined, result => {
        res.json({
            total,
            result
        })
     });

}

const getNoticiasHome = async (req, res = response) => {

    const { desde, limite } = req.body;

    var params = [];

    var sql = "select Id, Titulo, Imagen, SUBSTRING(Texto, 1, 141) as Texto from Noticias where Activo = 1 order by Id desc offset @desde rows fetch next @limite rows only";
    buildParams(params, "desde", TYPES.Int, desde);
    buildParams(params, "limite", TYPES.Int, limite);

    await query(params, sql, undefined, result => {
        res.json({
            result
        })
    });

}

const getNoticia = async (req, res = response) => {

    const { id }  = req.params

    const noticia = await simpleQuery(`select n.Id, n.Titulo, n.Texto, n.Imagen, n.Fecha, n.Usuario, nmt.Content as MetaTitle from Noticias n
    left join NoticiasMetaTitle nmt on(nmt.IdNoticia = n.Id)
    where n.Id = ${ id }`)

    const metaTags = await simpleQuery(`select Name, Content from NoticiasMetaTag where activo = 1 and IdNoticia = ${ id }`)
    noticia[0].MetaTags = metaTags

    res.json({
        noticia
    })

}

const createNoticia = async (req, res = response) => {

    const {
        MetaTitle,
        UsuarioCreacion,
        MetaTags,
        ...rest
      } = req.body

    const Titulo = sanitizeHtmlText(rest.Titulo)
    const Texto = sanitizeHtmlText(rest.Texto)
    const Usuario = sanitizeHtmlText(rest.Usuario)
    
    let Imagen = ''

    if(req.files){
        const { tempFilePath } = req.files.Imagen
        const nombreImagen = Titulo.toLowerCase().split(" ").join("-") // Como nombre dejamos el nombre de la noticia separado con guiones, ej: nueva-noticia
        cloudinary.uploader.destroy(`terapiacl/blog/${ nombreImagen }`) //Quita imagen previa (si existe)

        const { public_id, version } = await cloudinary.uploader.upload(tempFilePath, 
        {folder: "terapiacl/blog/", 
            public_id: nombreImagen
        })
        arr_public_id = public_id.split('/')
        Imagen = arr_public_id[arr_public_id.length-1]
        await simpleQuery(`update cloudinaryversion set Timestamp = ${ version }`) /* actualiza version de cloudinary */
    }

    const maxId = await simpleQuery('select MAX(Id) + 1 as Id from Noticias')
    await simpleQuery(`insert into Noticias values(${ maxId[0].Id }, '${ Titulo }', '${ Texto }', '${ Imagen }', GETDATE(), '${ Usuario }', 1, '', ${ UsuarioCreacion }, null, GETDATE(), '')`)
    const noticia = await simpleQuery(`select Id, Titulo, Texto, Imagen, Fecha from noticias where Id = ${ maxId[0].Id }`)

    if(MetaTitle){
        await simpleQuery(`insert into NoticiasMetaTitle values(${ maxId[0].Id },' ${ MetaTitle }', 1)`)
    }

    if(MetaTags !== 0){
        const parsedMetaTags = JSON.parse(MetaTags)
        if(parsedMetaTags.length > 0){
            for(let i = 0; i < parsedMetaTags.length; i++){
                await simpleQuery(`insert into NoticiasMetaTag values (${ maxId[0].Id }, '${ parsedMetaTags[i].Name }', '${ parsedMetaTags[i].Content }', 1)`)
            }
        }
    }

    res.json({
        msg: 'creado!!',
        noticia
    })
}

const updateNoticia = async (req, res = response) => {

    const {
        Id,
        MetaTitle,
        MetaTags,
        UsuarioModificacion,
        ...rest
      } = req.body

    const Titulo = sanitizeHtmlText(rest.Titulo)
    const Texto = sanitizeHtmlText(rest.Texto)
    const Usuario = sanitizeHtmlText(rest.Usuario)

    let strImagen = ''

    if(req.files){
        const noticiaBefore = await simpleQuery(`select Imagen from Noticias where Id = ${ Id }`)
        const nombreImagenBefore = noticiaBefore[0].Imagen
        const { tempFilePath } = req.files.Imagen
        const nombreImagen = Titulo.toLowerCase().split(" ").join("-") // Como nombre dejamos el nombre del Tipo de Problema separado con guiones, ej: problemas-familiares
        cloudinary.uploader.destroy(`terapiacl/blog/${ nombreImagenBefore }`) // Quita imagen previa (si existe)

        const { public_id, version } = await cloudinary.uploader.upload(tempFilePath, 
        {folder: "terapiacl/blog/", 
            public_id: nombreImagen
        })
        arr_public_id = public_id.split('/')
        strImagen = `, Imagen = '${ arr_public_id[arr_public_id.length-1] }' `
        await simpleQuery(`update cloudinaryversion set Timestamp = ${ version }`) /* actualiza version de cloudinary */
    }

    let sql = `update Noticias set
    Titulo = '${ Titulo }',
    Texto = '${ Texto }',
    Usuario = '${ Usuario }', 
    UsuarioModificacion = ${ UsuarioModificacion }, 
    FechaHoraModificacion = getdate()`
    +strImagen /*Agrega imagen*/
    +`where Id = ${ Id }`

    await simpleQuery(sql)
    
    if(MetaTitle){
        await simpleQuery(`delete NoticiasMetaTitle where IdNoticia = ${ Id }`)
        await simpleQuery(`insert into NoticiasMetaTitle values(${ Id }, '${ MetaTitle }', 1)`)
    }

    if(MetaTags !== 0){
        await simpleQuery(`delete NoticiasMetaTag where IdNoticia = ${ Id }`)
        const parsedMetaTags = JSON.parse(MetaTags)
        if(parsedMetaTags.length > 0){
            for(let i = 0; i < parsedMetaTags.length; i++){
                await simpleQuery(`insert into NoticiasMetaTag values (${ Id }, '${ parsedMetaTags[i].Name }', '${ parsedMetaTags[i].Content }', 1)`)
            }
        }
    }

    res.status(200).json({
        msg:'update!!',
        Id,
    })

}

const deleteNoticia = async (req, res = response) => {

    const { Id } = req.params

    const [Noticia] = await simpleQuery(`select Imagen from Noticias where Id = ${ Id }`)
    const nombreImagen = Noticia.Imagen

    // console.log(Id)
    // console.log(nombreImagen)
    cloudinary.uploader.destroy(`terapiacl/blog/${ nombreImagen }`) // Quita imagen (si existe)

    await simpleQuery(`delete NoticiasMetaTitle where IdNoticia = ${ Id }`)
    await simpleQuery(`delete NoticiasMetaTag where IdNoticia = ${ Id }`)
    await simpleQuery(`update Noticias set Activo = 0, Imagen = '' where Id = ${ Id }`)

    res.status(200).json({
        msg: 'delete !!',
        Id
    })
}

module.exports = {
    getNoticias,
    getNoticia,
    getNoticiasHome,
    createNoticia,
    updateNoticia,
    deleteNoticia
}