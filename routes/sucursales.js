const { Router } = require('express');
const { check } = require('express-validator');
const { getSucursales, getSucursal } = require('../controllers/sucursales');


const router = Router();




router.get('/', getSucursales);
router.post('/:toLink', getSucursal);

module.exports = router;