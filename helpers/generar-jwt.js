const jwt = require('jsonwebtoken');


const generarJWT = (uid = '') => { // El uid es lo unico que almacenaremos en el payload del JWT. El body del JWT se puede abrir y no es recomendable grabar información sensible


    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {

            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }

        })


    })

}





module.exports = {
    generarJWT
}