const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdmin } = require('../middlewares');
const { getNoticias, getNoticiasHome, getNoticia, createNoticia, updateNoticia, deleteNoticia } = require('../controllers/noticias');


const router = Router();




router.post('/', getNoticias);
router.post('/crear', [
    validarJWT,
    esAdmin
],createNoticia);
router.put('/editar',[
    validarJWT,
    esAdmin
],updateNoticia);
router.post('/home', getNoticiasHome);
router.get('/noticia/:id', getNoticia);
router.delete('/:Id',[
    validarJWT,
    esAdmin
],deleteNoticia)





module.exports = router;