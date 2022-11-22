const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getRangosEtariosSiat } = require('../controllers/rangos-etarios');


const router = Router();


router.post('/siat', getRangosEtariosSiat);

module.exports = router;