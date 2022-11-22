const { Router } = require('express');
const { getArancelesBySucursal } = require('../controllers/aranceles');


const router = Router();



router.get('/:sucursal', getArancelesBySucursal);




module.exports = router;