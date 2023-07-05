const jwt = require('jsonwebtoken')
const usuario = require('../models/usuario')

const validarJWT = (req, res, next) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición'
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET)
    req.uid = uid
    next()
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    })
  }
}

const validarAdminRole = async (req, res, next) => {
  const uid = req.uid

  try {
    const usuarioDB = await usuario.findById(uid)

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no existe'
      })
    }

    if (usuarioDB.role !== 'ADMIN_ROLE') {
      return res.status(403).json({
        ok: false,
        msg: 'No tiene permisos para realizar esta acción'
      })
    }

    next()
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Error en el servidor'
    })
  }
}

const validarAdminRoleOUsuarioPropio = async (req, res, next) => {
  const uid = req.uid
  const id = req.params.id

  try {
    const usuarioDB = await usuario.findById(uid)

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no existe'
      })
    }

    if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
      next()
    } else {
      return res.status(403).json({
        ok: false,
        msg: 'No tiene permisos para realizar esta acción'
      })
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Error en el servidor'
    })
  }
}

module.exports = {
  validarJWT,
  validarAdminRole,
  validarAdminRoleOUsuarioPropio
}
