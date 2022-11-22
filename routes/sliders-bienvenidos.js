const { Router } = require('express');
const { check } = require('express-validator');
const  { validarJWT, esAdmin } = require('../middlewares')
const {  getSlidersBienvenidos, getSliderBienvenidos, createSliderBienvenidos, updateSliderBienvenidos, deleteSliderBienvenidos } = require('../controllers/sliders-bienvenidos');
const router = Router();

router.get('/', getSlidersBienvenidos);
router.get('/:id', getSliderBienvenidos)
router.post('/', [ validarJWT ], createSliderBienvenidos)
router.put('/', [ validarJWT ], updateSliderBienvenidos)
router.delete('/:id', [ validarJWT ], deleteSliderBienvenidos)

module.exports = router