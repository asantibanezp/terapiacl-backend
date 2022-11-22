const { Router } = require('express');
const { getMensajeSitio, updateMensajeSitio } = require('../controllers/mensajeSitio');
const router = Router();




router.get('/', getMensajeSitio);
router.put('/', updateMensajeSitio);



module.exports = router;