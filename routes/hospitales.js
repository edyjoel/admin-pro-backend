const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { getHospitales, crearHospital, actualizarHospital, eliminarHospital } = require('../controllers/hospitales')
const { getMedicosById } = require('../controllers/medicos')

const router = Router()

router.get('/', validarJWT, getHospitales)

router.post('/', [
  validarJWT,
  check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
  validarCampos
], crearHospital)

router.put('/:id', [
  validarJWT,
  check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
  validarCampos
], actualizarHospital)

router.delete('/:id', validarJWT, eliminarHospital)

router.get('/:id', validarJWT, getMedicosById)

module.exports = router
