const { Router } = require('express');
const { getCldVersion } = require('../controllers/cloudinary');
const router = Router();




router.post('/version', getCldVersion);



module.exports = router;