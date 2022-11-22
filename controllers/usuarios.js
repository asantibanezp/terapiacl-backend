const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { query, buildParams } = require("../database/sql-connection");
const { simpleQuery } = require("../database/simpleQuery")
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
const { sendSGEmail } = require("../helpers/enviar-mail");


const usuarioGet = async (req, res = response) => {

    const { codUsuario } = req.params

    const sql = `select u.CodUsuario, u.Nombre, u.Email, u.TipoUsuario, u.Sexo from Usuarios u
    inner join TipoUsuario tu on(u.TipoUsuario = tu.CodTipoUsuario)
    where u.Vigente = 1 and u.CodUsuario = ${ codUsuario }`
    const params = []

    await query(params, sql, undefined, result => {
        res.json({
            result
        });
    })
}

const usuariosGet = async (req, res = response) => {

    const sql = `select u.CodUsuario, u.Nombre, u.Email, u.Imagen, tu.Descripcion as TipoUsuario from Usuarios u
    inner join TipoUsuario tu on(u.TipoUsuario = tu.CodTipoUsuario)
    where u.Vigente = 1 order by u.CodUsuario desc`
    const params = []

    await query(params, sql, undefined, result => {
        res.json({
            result
        });
    })
}

const usuariosPut = async (req, res = response) => {

    const { codUsuario, nombre, email, password, tipoUsuario, sexo } = req.body;

    let strPass = ''
    if(password !== ''){
        console.log('viene password')
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        const pass = bcryptjs.hashSync(password, salt)
        strPass = `, Password = '${ pass }'`
    }

    const searchByEmail = await simpleQuery(`select CodUsuario from Usuarios where Email = '${ email }' and CodUsuario <> ${ codUsuario } and Vigente = 1`)

    if(searchByEmail.length > 0){
        res.status(400).json({
            msg: 'Hay otro usuario con este email'
        })
        return false
    }

    let strImagen = ''
    if(req.files){
        const { tempFilePath } = req.files.imagen
        const nombreImagen = codUsuario // Como nombre dejamos el nombre del Tipo de Problema separado con guiones, ej: problemas-familiares
        cloudinary.uploader.destroy(`terapiacl/admin/usuarios/${ nombreImagen }`) // Quita imagen previa (si existe)

        const { public_id, version } = await cloudinary.uploader.upload(tempFilePath, 
        {folder: "terapiacl/admin/usuarios/", 
            public_id: nombreImagen
        })
        arr_public_id = public_id.split('/')
        strImagen = `, Imagen = '${ arr_public_id[arr_public_id.length-1] }'`
        await simpleQuery(`update cloudinaryversion set Timestamp = ${ version }`) /* actualiza version de cloudinary */
    }

    let sql = `update Usuarios set 
    Nombre = '${ nombre }', 
    Email = '${ email }',  
    TipoUsuario = ${ tipoUsuario }, 
    Sexo = ${ sexo }`
    sql += strPass
    sql += strImagen
    sql += ` where CodUsuario = ${ codUsuario }`

    await simpleQuery(sql)

    const usuario = await simpleQuery(`select u.CodUsuario, u.Nombre, u.Email, u.Imagen, tu.Descripcion as TipoUsuario from Usuarios u
    inner join TipoUsuario tu on(u.TipoUsuario = tu.CodTipoUsuario)
    where u.Vigente = 1 and u.CodUsuario = ${ codUsuario }`)

    res.status(201).json({ // Respondemos en formato JSON
        msg: 'usuario actualizado!',
        usuario
    });
}

const usuariosPost = async (req, res = response) => {

    const { nombre, email, password, tipoUsuario, sexo } = req.body;

     // Encriptar la contraseña
     const salt = bcryptjs.genSaltSync();
     const pass = bcryptjs.hashSync(password, salt)
     const codUsuario = await simpleQuery('select MAX(CodUsuario) + 1 as CodUsuario from Usuarios ')

    let strImagen = ''
    if(req.files){
        const { tempFilePath } = req.files.imagen
        const nombreImagen = codUsuario[0].CodUsuario // Como nombre dejamos el nombre del Tipo de Problema separado con guiones, ej: problemas-familiares
        cloudinary.uploader.destroy(`terapiacl/admin/usuarios/${ nombreImagen }`) // Quita imagen previa (si existe)

        const { public_id, version } = await cloudinary.uploader.upload(tempFilePath, 
        {folder: "terapiacl/admin/usuarios/", 
            public_id: nombreImagen
        })
        arr_public_id = public_id.split('/')
        strImagen = arr_public_id[arr_public_id.length-1]
        await simpleQuery(`update cloudinaryversion set Timestamp = ${ version }`) /* actualiza version de cloudinary */
    }

    await simpleQuery(`insert into usuarios values(${ codUsuario[0].CodUsuario }, '${ nombre }', '${ email }', '${ pass }', '${ strImagen }', '${ tipoUsuario }', 1, ${ sexo })`)
    const usuario = await simpleQuery(`select u.CodUsuario, u.Nombre, u.Email, u.Imagen, tu.Descripcion as TipoUsuario from Usuarios u
    inner join TipoUsuario tu on(u.TipoUsuario = tu.CodTipoUsuario)
    where u.Vigente = 1 and u.CodUsuario = ${ codUsuario[0].CodUsuario }`)

    await enviarEmailCreacion(nombre, email, password)

    res.status(201).json({ // Respondemos en formato JSON
        msg: 'usuario creado!!',
        usuario
    });
}

const usuariosDelete = async(req, res = response) => { // Usamos "async" cuando tengamos interacciones asincronas con "await", en este caso con la BD

    const { codUsuario } = req.params;

    await simpleQuery(`Update Usuarios set Vigente = 0 where CodUsuario = ${ codUsuario }`)
    cloudinary.uploader.destroy(`terapiacl/admin/usuarios/${ codUsuario }`) // Quita imagen

    res.json({
        codUsuario
    }); // Retornamos el usuario que acaba de ser borrado
}

const usuariosPatch = (req, res = response) => {
    res.json({ // Respondemos en formato JSON
        msg: 'patch API - Controlador'
    });
}

const usuariosTiposGet = async (req, res = response) => {

    const sql = `select CodTipoUsuario, Descripcion from TipoUsuario`
    const params = []

    await query(params, sql, undefined, result => {
        res.json({
            result
        });
    })
}

enviarEmailCreacion = async(nombre, email, password) =>{

    let to = ''
    // const cc = [ { email } ]
    const from = 'no-reply@terapia.cl'
    const subject = 'Nueva Cuenta Administración Terapia.cl'
    const text = 'Cuenta creada Estimado se ha creado un perfil de administración a tu nombre, en el sitio Terapia.cl Puedes acceder a tu cuenta con los siguientes datos '
    const html = `<!DOCTYPE html>
    
    <html>
    <body style="font-family: Arial, Helvetica, sans-serif !important; color: #6b6b6b">
        <div style="width: 600px;">
            <div style="color: #218d5d;">
                <h3>Cuenta creada</h3>
            </div>
            <div>  
            <p>Estimado (a) ${ nombre }, se ha creado un perfil de administración a tu nombre en el sitio Terapia.cl <br>
            Puedes acceder a tu cuenta con los siguientes datos:
            </p>
               <table style="font-family: Arial, Helvetica, sans-serif !important; color: #6b6b6b">
                    <tr>
                        <th style="text-align: left;">Email:</th>
                        <td>${ email }</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;">Password:</th>
                        <td><span style="color: #fc7404;">${ password }</span></td>
                    </tr>
               </table>
            </div>
        </div>
    </body>
    </html>`

    to = [ {"email" : email } ]
  
    return await sendSGEmail(to, from, subject, text, html);
    
}


module.exports = {
    usuariosGet,
    usuarioGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
    usuariosTiposGet
}