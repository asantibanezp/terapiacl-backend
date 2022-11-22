const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, esAdmin } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos');


const router = Router();


/*
* {{url}}/api/categorias
*/


// Obtener todas los productos - Publico
router.get('/', obtenerProductos)

// Obtener un producto por ID - Publico
router.get('/:id', [
    check('id', 'Debe ingresar un ID de producto válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto)

// Crear producto - privado - cualquier persona con token válido
router.post('/', [
    validarJWT,
    check('nombre', 'Debe ingresar un nombre').not().isEmpty(),
    check('categoria', 'Debe ingresar una categoría').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto)

// Actualizar - privado - cualquier persona con token válido
router.put('/:id', [
    validarJWT,
    check('id', 'Debe ingresar un ID de producto válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], actualizarProducto)

// Borrar un producto - Admin
router.delete('/:id', [
    validarJWT,
    esAdmin,
    check('id', 'Debe ingresar un ID de producto válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], eliminarProducto)



module.exports = router;