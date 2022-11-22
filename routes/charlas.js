const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, esAdmin } = require('../middlewares')
const { getCharlas, getCharlasMenu, getCharlasTemas, getCharla, createCharla, updateCharla, deleteCharla, getCharlasObjetivos} = require('../controllers/charlas');


const router = Router();




router.post('/', getCharlas);
router.post('/menu', getCharlasMenu);
router.post('/temas', getCharlasTemas);
router.post('/objetivos', getCharlasObjetivos);
router.post('/charla', getCharla);
router.post('/crear', [
    validarJWT,
    esAdmin
], createCharla);
router.put('/editar',[
    validarJWT,
    esAdmin
],updateCharla);
router.delete('/:CodCharla',[
    validarJWT,
    esAdmin
],deleteCharla)




module.exports = router;