const { Router } = require('express');
const { getPrevisiones, getPrevisionesConvenios} = require('../controllers/previsiones');
const router = Router();


router.get('/todas', getPrevisiones);
router.get('/convenios', getPrevisionesConvenios)



module.exports = router;