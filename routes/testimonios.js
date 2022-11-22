const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getTestimonios } = require('../controllers/testimonios');


const router = Router();




router.get('/', [
    // check('suc', 'Debe ingresar una sucursal').not().isEmpty(),
    // validarCampos
],
getTestimonios);



module.exports = router;