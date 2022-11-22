
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdmin } = require('../middlewares');
const { getTipos, getTipo, updateTipo, createTipo, deleteTipo } = require('../controllers/problemas-tipos');

const router = Router();

router.post('/', getTipos);
router.post('/tipo', getTipo);
router.post('/crear',[
    validarJWT,
    esAdmin
], createTipo)
router.put('/editar',[
    validarJWT,
    esAdmin
], updateTipo)
router.delete('/:codTipoProblema',[
    validarJWT,
    esAdmin
],deleteTipo)

module.exports = router;