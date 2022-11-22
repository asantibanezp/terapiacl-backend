const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getServicios, getEvaluaciones, getEvaluacion, getTerapiasIndividuales, getTerapiaIndividual } = require('../controllers/servicios');


const router = Router();




router.get('/', getServicios);
router.get('/evaluaciones', getEvaluaciones);
router.get('/evaluacion/:toLink', getEvaluacion);
router.get('/terapias-individuales', getTerapiasIndividuales);
router.get('/terapia-individual/:toLink', getTerapiaIndividual);

module.exports = router;