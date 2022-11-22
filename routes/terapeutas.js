const { Router } = require('express');
const { check } = require('express-validator');
const { getTerapeutas, getTerapeuta } = require('../controllers/terapeutas');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.post('/', getTerapeutas);
router.post('/terapeuta', [
    check('sucursal_to_link', 'sucursal_to_link es requerido').not().isEmpty(),
    check('cod_terapeuta', 'cod_terapeuta es requerido').not().isEmpty(),
    validarCampos
],getTerapeuta);

module.exports = router;