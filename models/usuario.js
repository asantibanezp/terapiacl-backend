
const { Schema, model } = require("mongoose");

// Mongo se graba en objetos o documentos, que se graban en colecciones, que son las tablas

// El modelo me ayudará a definir qué se agregará a la base de datos, que todo se vea como yo espero

// Todo en Mongoose comienza con un esquema. Cada esquema se asigna a una colección de MongoDB y define la forma de los documentos dentro de esa colección.

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    }, 
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El contraseña es obligatoria'],
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})


// Quitamos el password y la versión creada por mongo (__v)
// Cuando llamamos el modelo, llama al metodo toJSON. Podemos sobreescribirlo para filtrar los campos retornados (exportados)

UsuarioSchema.methods.toJSON = function () { 
    const { __v, password, _id, ...usuario } = this.toObject();

    usuario.uid = _id

    return usuario;
}

// Exportamos el model, que llamamos al comienzo, que pedira el nombre del modelo y que servirá a mongoose para ponerle el nombre a la colección.
// Mongoose por defecto le agrega una "s" (plural).

module.exports = model('Usuario', UsuarioSchema);