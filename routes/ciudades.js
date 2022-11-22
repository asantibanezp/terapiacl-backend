const { Router } = require('express');
const { getCiudades } = require('../controllers/ciudades');
const router = Router();




router.get('/', getCiudades);



module.exports = router;