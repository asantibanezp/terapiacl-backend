const { Router } = require('express');
const { check } = require('express-validator');

const { // Requerimos los middlewares desde el index
    validarCampos,
    validarJWT,
    esAdmin,
            } = require('../middlewares');

const { esTipoUsuarioValido, emailExiste, existeUsuarioByCodUsuario } = require('../helpers/db-validators');

const { usuariosGet,
        usuarioGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch,
        usuariosTiposGet
    } = require('../controllers/usuarios');

const router = Router();



router.get('/tipos', usuariosTiposGet);
router.get('/', usuariosGet);
router.get('/:codUsuario', usuarioGet);

router.put('/', [
    validarJWT,
    esAdmin,
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioByCodUsuario),
    // check('rol').custom(esTipoUsuarioValido),
    validarCampos
], usuariosPut);

router.post('/', [
    validarJWT,
    esAdmin,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('tipoUsuario').custom(esTipoUsuarioValido),
    check('email').custom(emailExiste),
    validarCampos
], usuariosPost);

router.delete('/:codUsuario', [
    validarJWT,
    esAdmin,
    check('codUsuario').custom(existeUsuarioByCodUsuario),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch)



module.exports = router;