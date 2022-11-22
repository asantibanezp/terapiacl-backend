const { response } = require("express");

const esAdmin = (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            title: 'Se quiere verificar el role sin validar el token primero',
            text: 'Acción truncada',
            code: 'no-token'
        });
    }

    const { CodTipoUsuario, Nombre } = req.usuario[0]

    if (CodTipoUsuario !== 1) {
        return res.status(401).json({
            title: `${Nombre} no es administrador - función inhabilitada`,
            text: 'Acción requiere privilegios elevados',
            code: 'no-admin'
        });
    }
    next();
    
}


module.exports = {
    esAdmin,
}