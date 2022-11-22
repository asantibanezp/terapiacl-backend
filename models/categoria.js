const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligadorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        requird: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});


// Quitamos la versión creada por mongo (__v) y el estado
// Cuando llamamos el modelo, llama al metodo toJSON. Podemos sobreescribirlo para filtrar los campos retornados (exportados)

CategoriaSchema.methods.toJSON = function () { 
    const { __v, estado, ...data } = this.toObject();
    return data;
}


module.exports = model( 'Categoria', CategoriaSchema );