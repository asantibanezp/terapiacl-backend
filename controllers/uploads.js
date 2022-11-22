const { response } = require("express");
const path = require("path");
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require('../models');



const cargarArchivo = async (req, res = response) => {

    try {

        const pathCompleto = await subirArchivo(req.files, ['txt', 'md', 'jpg'], 'imgs');

        res.json({
            nombre: pathCompleto
        })

    } catch (msg) {

        res.status(400).json({ msg })

    }

}



const actualizarImagen = async (req, res = response) => {


    const { id, coleccion } = req.params;

    let modelo;


    switch (coleccion) {

        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id: ${id}`
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: `Se me olvidó validar esto` });
    }


    // limpiar imagenes previas
    if(modelo.img){
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync( pathImagen );
        }
    }


    // El try/catch lo puse yo
    try{

        const nombre = await subirArchivo(req.files, undefined, coleccion);
        modelo.img = nombre;
        modelo.save();

    }catch(msg){

        return res.status(400).json({msg});

    }

    res.json({
        modelo
    })

}


const actualizarImagenCloudinary = async (req, res = response) => {


    const { id, coleccion } = req.params;

    let modelo;


    switch (coleccion) {

        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id: ${id}`
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: `Se me olvidó validar esto` });
    }


    // limpiar imagenes previas de cloudinary
    if(modelo.img){

        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1]
        const [ public_id ] =  nombre.split('.');

        cloudinary.uploader.destroy(public_id);

    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );


    modelo.img = secure_url;
    modelo.save();


    res.json(modelo);

}


const mostrarImagen = async(req, res = response) => {


    const { id, coleccion } = req.params;

    let modelo;


    switch (coleccion) {

        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id: ${id}`
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: `Se me olvidó validar esto` });
    }


    // Busca  si hay una imagen y la envía
    if(modelo.img){
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
           return res.sendFile(pathImagen);
        }
    }

    const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
    if(fs.existsSync(pathImagen)){
       return res.sendFile(pathImagen);
    }
    
}





module.exports = {
    cargarArchivo,
    actualizarImagen,
    actualizarImagenCloudinary,
    mostrarImagen
}