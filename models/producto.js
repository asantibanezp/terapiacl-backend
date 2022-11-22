const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true},
    img: { type: String }
});


// Quitamos la versión creada por mongo (__v) y el estado
// Cuando llamamos el modelo, llama al metodo toJSON. Podemos sobreescribirlo para filtrar los campos retornados (exportados)

ProductoSchema.methods.toJSON = function () { 
    const { __v, estado, ...data } = this.toObject();
    return data;
}


module.exports = model( 'Producto', ProductoSchema );