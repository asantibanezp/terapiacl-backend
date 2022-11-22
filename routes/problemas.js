const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdmin } = require('../middlewares');
const { getProblema, getProblemas, createProblema, deleteProblema, updateProblema } = require('../controllers/problemas');


const router = Router();

router.post('/', getProblemas)
router.post('/problema', getProblema)
router.post('/crear',[
    validarJWT,
    esAdmin
], createProblema)
router.put('/editar',[
    validarJWT,
    esAdmin
],updateProblema)
router.delete('/:CodProblema', [
    validarJWT,
    esAdmin
],deleteProblema)

module.exports = router;