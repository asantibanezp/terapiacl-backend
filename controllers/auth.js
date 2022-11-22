const { response } = require("express");
// const Usuario = require('../models/usuario');
// const { usuarioGetModel } = require('../models/auth')
const { simpleQuery } = require('../database/simpleQuery')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { googleVerify } = require("../helpers/google-verify");
const { query, buildParams } = require("../database/sql-connection");
var TYPES = require("tedious").TYPES;


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const sql = `select CodUsuario, Nombre, Email, Password, Imagen, TipoUsuario, Sexo from Usuarios where Vigente = 1 and Email = '${email}'`;
        const usuario = await simpleQuery(sql);

        // Validamos que el usuario exista
        if(usuario.length === 0){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario[0].Password);

        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Si no tiene imagen, le busca una aleatoria segun su sexo
        if(!usuario[0].Imagen){
            let randomImage = await randomAvatarGet(Number(usuario[0].Sexo))
            usuario[0].Imagen = randomImage.Imagen
         }


        // Generar el JWT
        const token = jwt.sign({
            CodUsuario: usuario[0].CodUsuario,
            Nombre: usuario[0].Nombre,
            Email: usuario[0].Email,
            Imagen: usuario[0].Imagen
        }, process.env.SECRETORPRIVATEKEY, { expiresIn: 7200 /* 2hrs */ }); 

        res.json({
            token
        })
   
    }catch(error){

        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
        
    }

}

randomAvatarGet = async (sex = 1) => {

    const sql = `select Imagen from randomAvatar where Vigente = 1 and Sexo = ${ sex }`
    const avatars = await simpleQuery(sql)
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

    return randomAvatar

}


module.exports = {
    login
}