const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria, Producto } = require("../models");



const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];


buscarUsuarios = async (termino = '', res = response) => {

    const isMongoId = ObjectId.isValid(termino); // true

    if (isMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []    // Si hay regresa el valor y si no, un arreglo vacío
        });
    }


    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    })

}

buscarCategorias = async (termino = '', res = response) => {

    const isMongoId = ObjectId.isValid(termino); // true

    if (isMongoId) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []    // Si hay regresa el valor y si no, un arreglo vacío
        });
    }


    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria.find({ nombre: regex, estado: true });

    res.json({
        results: categorias
    })

}

buscarProductos = async (termino = '', res = response) => {

    const isMongoId = ObjectId.isValid(termino); // true

    if (isMongoId) {
        const producto = await Producto.findById(termino)
            .populate('categoria', 'nombre');
            
        return res.json({
            results: (producto) ? [producto] : []    // Si hay regresa el valor y si no, un arreglo vacío
        });
    }


    const regex = new RegExp(termino, 'i');

    const producto = await Producto.find({ nombre: regex, estado: true })
        .populate('categoria', 'nombre');

    res.json({
        results: producto
    })

}


const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params


    if (!coleccionesPermitidas.includes(coleccion)) {

        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })

    }

    switch (coleccion) {

        case 'usuarios':
            buscarUsuarios(termino, res);
            break;

        case 'categorias':
            buscarCategorias(termino, res);
            break;

        case 'productos':
            buscarProductos(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'Se me olvidó hacer esta búsqueda'
            })

    }

}



module.exports = {
    buscar
}