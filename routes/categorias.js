const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { validarJWT, esAdmin } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeCategoriaPorNombre, existeCategoriaPorId } = require('../helpers/db-validators');


const router = Router();


/*
* {{url}}/api/categorias
*/


// Obtener todas la categorias - Publico
router.get('/', obtenerCategorias)

// Obtener una categoría por ID - Publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria)

// Crear Categoría - privado - cualquier persona con token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar - privado - cualquier persona con token válido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    check('nombre').custom(existeCategoriaPorNombre),
    validarCampos
], actualizarCategoria)

// Borrar una categoría - Admin
router.delete('/:id', [
    validarJWT,
    esAdmin,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria)



module.exports = router;