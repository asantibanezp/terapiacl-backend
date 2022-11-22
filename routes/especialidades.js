const { Router } = require('express');
const { getEspecialidadesMenu, getEspecialidadesBilingue, getEspecialidad, getEspecialidadesCombos } = require('../controllers/especialidades');

const router = Router();


router.post('/menu', getEspecialidadesMenu);
router.post('/bilingue', getEspecialidadesBilingue);
router.get('/combos', getEspecialidadesCombos);
router.post('/:toLink', getEspecialidad)

module.exports = router;