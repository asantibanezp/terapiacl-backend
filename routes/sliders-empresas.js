const { Router } = require('express');
const { check } = require('express-validator');
const  { validarJWT, esAdmin } = require('../middlewares')
const { getSlidersEmpresas, getSliderEmpresas, createSliderEmpresas, updateSliderEmpresas, deleteSliderEmpresas } = require('../controllers/sliders-empresas');
const router = Router();

router.get('/', getSlidersEmpresas);
router.get('/:id', getSliderEmpresas)
router.post('/', [ validarJWT ], createSliderEmpresas)
router.put('/', [ validarJWT ], updateSliderEmpresas)
router.delete('/:id', [ validarJWT ], deleteSliderEmpresas)

module.exports = router