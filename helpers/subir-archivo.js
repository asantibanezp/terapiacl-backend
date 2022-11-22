const path = require('path');
const { v4: uuidv4 } = require('uuid');



const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'csv'], carpeta = '') => {

    return new Promise((resolve, reject) => {


        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        // Validar la extensión
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no está permitida - ${extensionesValidas}`)
        }

        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp); // Si la carpeta no existe, la crea (createParentPath en server.js)

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(nombreTemp);
        });

    })

}




    module.exports = {
        subirArchivo
    }