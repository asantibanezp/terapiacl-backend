const dbValidators = require('./db-validators');
const generarJWT = require('./generar-jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');
const dbQueries = require('./db-queries');
const general = require('./general');
const enviarMail = require('./enviar-mail');
const cloudinary = require('./cloudinary');



module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo,
    ...dbQueries,
    ...enviarMail,
    ...general,
    ...cloudinary
}