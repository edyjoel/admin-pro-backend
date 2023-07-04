const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { getMedicos, crearMedico, actualizarMedico, eliminarMedico, getMedicosById } = require('../controllers/medicos')

const router = Router()

router.get('/', validarJWT, getMedicos)

router.post('/', [
  validarJWT,
  check('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
  check('hospital', 'El id del hospital debe ser válido').isMongoId(),
  validarCampos
], crearMedico)

router.put('/:id', [
  validarJWT,
  check('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
  check('hospital', 'El id del hospital debe ser válido').isMongoId(),
  validarCampos
], actualizarMedico)

router.delete('/:id', validarJWT, eliminarMedico)
router.get('/:id', validarJWT, getMedicosById)

module.exports = router
