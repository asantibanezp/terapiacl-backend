const { validationResult } = require('express-validator');


const validarCampos = (req, res, next) => {


    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

next(); // Si pasa la validación, se va al siguiente middleware y si no hay más middlewares, pasa al controlador. Esto lo hacen todos los middlewares.
}






module.exports = {
    validarCampos
}