const { response } = require("express");
const { Producto } = require("../models");


const crearProducto = async(req, res = response) => {

    const { estado, usuario, ...body} = req.body;


    const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() });

    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${body.nombre} ya existe en DB`
        })
    }

    body.usuario = req.usuario._id
    body.nombre = body.nombre.toUpperCase();

    const producto = new Producto(body);

    await producto.save();


    res.status(201).json({
       producto
    })

}

const obtenerProductos = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true } // Traemos sólo usuarios activos


    // Las promesas (await) pausan la ejecución hasta obtener una resolución. Esto en algunos casos (dependiendo del código, por ejemplo si la paomesa 2 no depende del resultado de la promesa 1), puede
    // generar tiempos indeseados de respuesta, que se pueden optimizar. "Promise.all" sirve para trabajar con varias promesas simultáneamente, con un solo await

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde)) // Establece desde qué registro quiere empezar a desplegar
            .limit(Number(limite)) // Limita el número de usuarios desplegados
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ])


    res.json({ // Respondemos en formato JSON
        total,
        productos
    });
}

const obtenerProducto = async(req, res = response) => {

   const { id } = req.params;

   const producto = await Producto.findById(id)
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre')

    res.json({
        producto
    })

}

const actualizarProducto = async(req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new:true });

    res.json( producto );

}

const eliminarProducto = async(req, res = response) => {

    const { id } = req.params

    const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new:true});

    res.json(producto);

}




module.exports = {
    crearProducto, 
    obtenerProductos,
    obtenerProducto, 
    actualizarProducto,
    eliminarProducto
}