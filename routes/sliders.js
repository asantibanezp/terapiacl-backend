const { Router } = require('express');
const { check } = require('express-validator');
const { getSlidersBienvenidos, getSlidersEmpresas } = require('../controllers/sliders');
const router = Router();

router.get('/bienvenidos', getSlidersBienvenidos);
router.get('/empresas', getSlidersEmpresas);



module.exports = router;