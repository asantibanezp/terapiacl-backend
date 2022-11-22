const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const { query, buildParams } = require("../database/sql-connection");
const { simpleQuery } = require("../database/simpleQuery")


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');



    if(!token){
        return res.status(401).json({
            title: 'No hay token en la petición',
            text: 'Debe iniciar sesión',
            code: 'no-token'
        })
    }


    try{

        const { CodUsuario }  = jwt.verify( token, process.env.SECRETORPRIVATEKEY )

        const usuario =  await simpleQuery(`select u.CodUsuario, u.Nombre, u.Email, u.Imagen, u.Vigente, tu.Descripcion, tu.CodTipoUsuario from Usuarios u
        inner join TipoUsuario tu on(u.TipoUsuario = tu.CodTipoUsuario)
        where u.Vigente = 1 and u.CodUsuario = ${ CodUsuario }`)


        if(!usuario){
            return res.status(401).json({
                title: 'Token no válido - usuario no esiste en DB',
                text: 'Debe iniciar sesión',
                code: 'invalid-user'
            })
        }


        req.usuario = usuario;

        next(); // Si pasa la validación, se va al siguiente middleware y si no hay más middlewares, pasa al controlador. Esto lo hacen todos los middlewares.

    }catch (error){

        console.log(error);
        res.status(401).json({
            title: 'Token expirado',
            text: 'Debe iniciar sesión',
            code: 'token-timed-out'
        })

    }

    // console.log(token);
    // next(); ESTO ESTABA FALLANDO, ERROR: " Cannot set headers after they are sent to the client" 
}


module.exports = {
    validarJWT
}