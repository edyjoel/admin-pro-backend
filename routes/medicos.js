const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { getMedicos, crearMedico, actualizarMedico, eliminarMedico } = require('../controllers/medicos')

const router = Router()

router.get('/', validarJWT, getMedicos)

router.post('/', [
  validarJWT,
  check('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
  check('hospital', 'El id del hospital debe ser válido').isMongoId(),
  validarCampos
], crearMedico)

router.put('/:id', [

], actualizarMedico)

router.delete('/:id', validarJWT, eliminarMedico)

module.exports = router
