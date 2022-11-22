const { Router } = require('express');
const { check } = require('express-validator');
const  { validarJWT, esAdmin } = require('../middlewares')
const { getSlidersPrincipal, getSliderPrincipal, createSliderPrincipal, updateSliderPrincipal, deleteSliderPrincipal } = require('../controllers/sliders-principal');
const router = Router();

router.get('/', getSlidersPrincipal)
router.get('/:id', getSliderPrincipal)
router.post('/', [ validarJWT ], createSliderPrincipal)
router.put('/', [ validarJWT ], updateSliderPrincipal)
router.delete('/:id', [ validarJWT ], deleteSliderPrincipal)
 
module.exports = router