const { response } = require("express");
const { Categoria } = require('../models');


// obtenerCategorias - paginado - total - populate (crea al relación para que aparezca el nombre de usuario en la respuesta)

const obtenerCategorias = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true } // Traemos sólo usuarios activos


    // Las promesas (await) pausan la ejecución hasta obtener una resolución. Esto en algunos casos (dependiendo del código, por ejemplo si la paomesa 2 no depende del resultado de la promesa 1), puede
    // generar tiempos indeseados de respuesta, que se pueden optimizar. "Promise.all" sirve para trabajar con varias promesas simultáneamente, con un solo await

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(desde)) // Establece desde qué registro quiere empezar a desplegar
            .limit(Number(limite)) // Limita el número de usuarios desplegados
            .populate('usuario', 'nombre')
    ])


    res.json({ // Respondemos en formato JSON
        total,
        categorias
    });

}

// obtenerCatrgoria - populate {}

const obtenerCategoria = async (req, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findById(id)
        .populate('usuario', 'nombre')

    res.json(categoria);


}




const crearCategoria = async (req, res = response) => {


    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {

        return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre}, ya existe`
        });

    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    // Guardar DB
    await categoria.save();

    res.status(201).json(categoria);

}

// actualizarCategoria

const actualizarCategoria = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new:true });

    res.json( categoria );
}

// borrarCategoria - estado:false

const borrarCategoria = async (req, res) => {

    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });

    res.json({
        categoria
    })

}





module.exports = {
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias,
    actualizarCategoria,
    borrarCategoria
}