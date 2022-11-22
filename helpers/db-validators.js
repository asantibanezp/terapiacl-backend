const { Usuario, Role, Categoria, Producto } = require('../models');
const { simpleQuery } = require("../database/simpleQuery")
const { query, buildParams } = require("../database/sql-connection");




const esTipoUsuarioValido = async (codTipoUsuario = '') => {

    // Verificar si el correo existe || Si el email no existe lo dejo pasar, y si existe lanzo el error
    const tipoUsuario = await simpleQuery(`select CodTipoUsuario from TipoUsuario where CodTipoUsuario = ${ codTipoUsuario }`)

    if(!tipoUsuario.length > 0){
        throw new Error(`Tipo de Usuario no válido`);
    }

}

const emailExiste = async (correo = '') => {

    // Verificar si el correo existe || Si el email no existe lo dejo pasar, y si existe lanzo el error
    const usuario = await simpleQuery(`select CodUsuario from usuarios where Vigente = 1 and Email = '${ correo }'`)

    if(usuario.length > 0){
        throw new Error(`El email ${correo} ya existe en la BD`);
    }
}


const existeUsuarioByCodUsuario = async (codUsuario) => {

    // Verificar si el usuario existe || Si el usuario existe lo dejo pasar, y si no existe lanzo el error
    const existeUsuario = await simpleQuery(`select CodUsuario from Usuarios where CodUsuario = ${ codUsuario } and Vigente = 1`);
    if (!existeUsuario.length > 0) {
        throw new Error(`El CodUsuario ${codUsuario} no existe en la BD`);
    }

}

const existeCategoriaPorId = async(id) => {

    const existeCategoria = await Categoria.findById(id);

    if(!existeCategoria) {
        throw new Error(`La categoría buscada: ${id}, no existe en la BD`);
    }

}

const existeCategoriaPorNombre = async (nombre = '') => {

    // Verificar si el correo existe || Si el email no existe lo dejo pasar, y si existe lanzo el error
    const existeNombre = await Categoria.findOne({ nombre });

    if (existeNombre) {
        throw new Error(`Ya existe una categoría con el nombre "${nombre}" en la BD`);
    }

}

const existeProductoPorId = async(id) => {

    const existeProducto = await Producto.findById(id);

    if(!existeProducto) {
        throw new Error(`El producto buscado buscado: ${id}, no existe en la BD`);
    }

}

const existeProductoPorNombre = async (nombre = '') => {

    // Verificar si el correo existe || Si el email no existe lo dejo pasar, y si existe lanzo el error
    const existeNombre = await Producto.findOne({ nombre });

    if (existeNombre) {
        throw new Error(`Ya existe un producto con el nombre "${nombre}" en la BD`);
    }

}


const coleccionesPermitidas = async(coleccion = '', colecciones = []) => {


    const incluida = colecciones.includes(coleccion);

    if(!incluida) {
        throw new Error(`La colección ${ coleccion } no es permitida, ${ colecciones }`);
    }

    return true
}


const existeSucursal = async(sucursal = undefined, toLink = undefined) => {

    let query = `SELECT CodSucursal FROM Sucursal `

    if(sucursal){
        query += `where CodSucursal = ${ sucursal }`
    }else if(toLink){
        query += `where ToLink = '${ toLink }'`
    }

    let sucursal_exists = await simpleQuery(query)
    const data = sucursal_exists.length != 0 ? sucursal_exists : false

    return data
}

const existeEspecialidad = async(id = undefined, toLink = undefined) => {

    let query = `SELECT Id FROM Especialidades `

    if(id){
        query += `where Id = ${ id }`
    }else if(toLink){
        query += `where ToLink = '${ toLink }'`
    }

    let especialidad_exists = await simpleQuery(query)
    const data = especialidad_exists.length != 0 ? especialidad_exists : false

    return data
}

module.exports = {
    esTipoUsuarioValido,
    emailExiste,
    existeUsuarioByCodUsuario,
    existeCategoriaPorId,
    existeCategoriaPorNombre,
    existeProductoPorId,
    existeProductoPorNombre,
    coleccionesPermitidas,
    existeSucursal,
    existeEspecialidad
}