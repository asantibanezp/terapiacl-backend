const { Router } = require('express');
const { getPacksBySucursal } = require('../controllers/packs');


const router = Router();



router.get('/:sucursal', getPacksBySucursal);




module.exports = router;