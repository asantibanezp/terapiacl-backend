const { Router } = require('express');
const { getComunas } = require('../controllers/comunas');
const router = Router();




router.get('/', getComunas);



module.exports = router;