const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { procesarFormularioContactanos } = require('../controllers/FormularioContactanos');
const { procesarFormularioOrientacion } = require('../controllers/FormularioOrientacion');
const { procesarFormularioTrabajo } = require('../controllers/FormularioTrabajo');
const { procesarFormularioServiciosEmpresas } = require('../controllers/FormularioServiciosEmpresas');
const { procesarFormularioInscripcionCharla } = require('../controllers/FormularioInscripcionCharla');
const { procesarFormularioTerapiaBilingue } = require('../controllers/FormularioTerapiaBilingue');

const router = Router();

router.post('/contactanos',[
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('nombre', 'Máximo de caracteres excedido para Nombre').isLength({max: 100}),
    check('asunto', 'El asunto es requerido').not().isEmpty(),
    check('asunto', 'Máximo de caracteres excedido para Asunto').isLength({max: 100}),
    check('mensaje', 'El mensaje es requerido').not().isEmpty(),
    check('mensaje', 'Máximo de caracteres excedido para Mensaje').isLength({max: 700}),
    check('telefono', 'El telefono es requerido').not().isEmpty(),
    check('telefono', 'Máximo de caracteres excedido para Telefono').isLength({max: 70}),
    check('sucursal', 'La sucursal es requerida').not().isEmpty(),
    check('sucursal', 'Máximo de caracteres excedido para Sucursal').isLength({max: 1}),
    check('email', 'El email no es válido').isEmail(),
    check('email', 'El email es requerido').not().isEmpty(),
    check('email', 'Máximo de caracteres excedido para Email').isLength({max: 100}),
    validarCampos
] ,procesarFormularioContactanos);

router.post('/orientacion',[
    check('sucursal', 'Sucursal es requerida').not().isEmpty(),
    check('sucursal', 'Máximo de caracteres excedido para Sucursal').isLength({max: 1}),
    check('nombres', 'Los Nombres son requeridos').not().isEmpty(),
    check('nombres', 'Máximo de caracteres excedido para Nombres').isLength({max: 100}),
    check('apellidos', 'Los Apellidos son requeridos').not().isEmpty(),
    check('apellidos', 'Máximo de caracteres excedido para Apellidos').isLength({max: 100}),
    check('digito', 'Máximo de caracteres excedido para Digito').isLength({max: 1}),
    check('email', 'El Email es requerido').not().isEmpty(),
    check('email', 'Máximo de caracteres excedido para Email').isLength({max: 100}),
    check('celular', 'El Celular es requerido').not().isEmpty(),
    check('celular', 'Máximo de caracteres excedido para Celular').isLength({max: 50}),
    check('prevision', 'La prevision es requerida').not().isEmpty(),
    check('prevision', 'Máximo de caracteres excedido para Prevision').isLength({max: 50}),
    check('fechaNacimiento', 'Fecha de Nacimiento es requerida').not().isEmpty(),
    check('fechaNacimiento', 'Máximo de caracteres excedido para Fecha Nacimiento').isLength({max: 10}),
    validarCampos,
], procesarFormularioOrientacion);

router.post('/trabajo',[
    check('nombres', 'Los Nombres son requeridos').not().isEmpty(),
    check('nombres', 'Máximo de caracteres excedido para Nombres').isLength({max: 90}),
    check('apellidos', 'Los Apellidos son requeridos').not().isEmpty(),
    check('apellidos', 'Máximo de caracteres excedido para Apellidos').isLength({max: 90}),
    check('rut', 'El Rut es requerido').not().isEmpty(),
    check('rut', 'Máximo de caracteres excedido para Rut').isLength({max: 8}),
    check('digito', 'El Digito es requerido').not().isEmpty(),
    check('digito', 'Máximo de caracteres excedido para Digito').isLength({max: 1}),
    check('email', 'El Email es requerido').not().isEmpty(),
    check('email', 'Máximo de caracteres excedido para Email').isLength({max: 100}),
    check('email', 'El Email es requerido').not().isEmpty(),
    check('email', 'El Email no es válido').isEmail(),
    check('telefono', 'El Telefono es requerido').not().isEmpty(),
    check('telefono', 'Máximo de caracteres excedido para Telefono').isLength({max: 50}),
    check('especialidad', 'El campo Especialidad es requerida').not().isEmpty(),
    check('especialidad', 'Máximo de caracteres excedido para Especialidad').isLength({max: 50}),
    check('anosExperiencia', 'El campo Experiencia es requerida').not().isEmpty(),
    check('anosExperiencia', 'Máximo de caracteres excedido para Experiencia').isLength({max: 2}),
    check('anosExperiencia', 'Experiencia debe ser un caracter numérico').isNumeric(),
    check('grupoEtario', 'El campo Grupo Etario es requerida').not().isEmpty(),
    check('grupoEtario', 'Máximo de caracteres excedido para Grupo Etario').isLength({max: 60}),
    check('dispHoraria', 'El campo Disponibilidad Horaria es requerida').not().isEmpty(),
    check('dispHoraria', 'Máximo de caracteres excedido para Disponibilidad Horaria').isLength({max: 100}),
    check('dispSucursal', 'El campo Disponibilidad Sucursal es requerida').not().isEmpty(),
    check('dispSucursal', 'Máximo de caracteres excedido para Disponibilidad Sucursal').isLength({max: 60}),
    check('expeHonorarios', 'El campo Expectativas Honorarios es requerido').not().isEmpty(),
    check('expeHonorarios', 'Máximo de caracteres excedido para Expectativas Honorarios').isLength({max: 50}),
    validarCampos,
], procesarFormularioTrabajo);

router.post('/servicios-empresas',[
    check('empresa', 'Campo Empresa es requerido').not().isEmpty(),
    check('empresa', 'Máximo de caracteres excedido para Empresa').isLength({max: 250}),
    check('contacto', 'Campo Contacto es requerido').not().isEmpty(),
    check('contacto', 'Máximo de caracteres excedido para Contacto').isLength({max: 250}),
    check('email', 'El Email es requerido').not().isEmpty(),
    check('email', 'Máximo de caracteres excedido para Email').isLength({max: 100}),
    check('email', 'El Email no es válido').isEmail(),
    check('telefono', 'El Telefono es requerido').not().isEmpty(),
    check('telefono', 'Máximo de caracteres excedido para Telefono').isLength({max: 50}),
    check('consulta', 'Máximo de caracteres excedido para Consulta').isLength({max: 500}),
    check('servicios', 'Campo Servicios es requerido').not().isEmpty(),
    check('servicios', 'Máximo de caracteres excedido para Servicios').isLength({max: 250}),
    validarCampos,
], procesarFormularioServiciosEmpresas);

router.post('/inscripcion-charla',[
    check('nombreCompleto', 'Campo nombre completo es requerido').not().isEmpty(),
    check('nombreCompleto', 'Máximo de caracteres excedido para nombre_completo').isLength({max: 180}),
    check('rut', 'El rut_participante es requerido').not().isEmpty(),
    check('rut', 'Máximo de caracteres excedido para rut_participante').isLength({max: 8}),
    check('digito', 'El Digito es requerido').not().isEmpty(),
    check('digito', 'Máximo de caracteres excedido para Digito').isLength({max: 1}),
    check('comentarios', 'Máximo de caracteres excedido para comentarios').isLength({max: 500}),
    check('fechaNacimiento', 'El campo fecha_nacimiento es requerido').not().isEmpty(),
    check('fechaNacimiento', 'Máximo de caracteres excedido para fecha_nacimiento').isLength({max: 10}),
    check('email', 'Campo email es requerido').not().isEmpty(),
    check('email', 'Máximo de caracteres excedido para email').isLength({max: 100}),
    check('email', 'El Email no es válido').isEmail(),
    check('telefono', 'El Telefono es requerido').not().isEmpty(),
    check('telefono', 'Máximo de caracteres excedido para Telefono').isLength({max: 50}),
    validarCampos,
], procesarFormularioInscripcionCharla);

router.post('/terapia-bilingue',[
    check('nombres', 'Campo nombres es requerido').not().isEmpty(),
    check('apellidos', 'Máximo de caracteres excedido para napellidos').isLength({max: 180}),
    check('sexo', 'El campo sexo es requerido').not().isEmpty(),
    check('sexo', 'Máximo de caracteres excedido para campo sexo').isLength({max: 1}),
    check('documento', 'Máximo de caracteres excedido para Documento').isLength({max: 50}),
    check('tipo_documento', 'Campo tipo_documento es requerido').not().isEmpty(),
    check('tipo_documento', 'Máximo de caracteres excedido para tipo_documento').isLength({max: 1}),
    check('fecha_nacimiento', 'El campo fecha_nacimiento es requerido').not().isEmpty(),
    check('fecha_nacimiento', 'Máximo de caracteres excedido para fecha_nacimiento').isLength({max: 10}),
    check('pais_nacimiento', 'El campo pais_nacimiento es requerido').not().isEmpty(),
    check('pais_nacimiento', 'Máximo de caracteres excedido para pais_nacimiento').isLength({max: 50}),
    check('email', 'Campo email es requerido').not().isEmpty(),
    check('email', 'Máximo de caracteres excedido para email').isLength({max: 100}),
    check('email', 'El Email no es válido').isEmail(),
    check('telefono', 'El Telefono es requerido').not().isEmpty(),
    check('telefono', 'Máximo de caracteres excedido para Telefono').isLength({max: 50}),
    check('especialidad_lenguaje', 'Campo comentarios especialidad_lenguaje es requerido').not().isEmpty(),
    check('especialidad_lenguaje', 'Máximo de caracteres excedido para comentarios especialidad_lenguaje').isLength({max: 50}),
    check('comentarios', 'Campo comentarios es requerido').not().isEmpty(),
    check('comentarios', 'Máximo de caracteres excedido para comentarios').isLength({max: 500}),
    check('cod_sucursal', 'El cod_sucursal es requerido').not().isEmpty(),
    check('cod_sucursal', 'Máximo de caracteres excedido para cod_sucursal').isLength({max: 1}),
    check('locale', 'El locale es requerido').not().isEmpty(),
    check('locale', 'Máximo de caracteres excedido para locale').isLength({max: 2}),
    validarCampos,
], procesarFormularioTerapiaBilingue);

module.exports = router