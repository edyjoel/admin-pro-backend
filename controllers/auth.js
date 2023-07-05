const { response } = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')
const { verify } = require('../helpers/google-verify')
const { getMenuFrontEnd } = require('../helpers/menu-frontend')

const login = async (req, res = response) => {
  const { email, password } = req.body

  try {
    const usuarioDB = await Usuario.findOne({ email })

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Email no encontrado'
      })
    }

    const validPassword = bcrypt.compareSync(password, usuarioDB.password)

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña no válida'
      })
    }

    const token = await generarJWT(usuarioDB.id)

    res.json({
      ok: true,
      token,
      menu: getMenuFrontEnd(usuarioDB.role)
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

const googleSingIn = async (req, res = response) => {
  const googleToken = req.body.token

  try {
    const { email, name, picture } = await verify(googleToken)

    const usuarioDB = await Usuario.findOne({ email })
    let usuario

    if (!usuarioDB) {
      usuario = new Usuario({
        nombre: name,
        email,
        password: '@@@',
        img: picture,
        google: true
      })
    } else {
      usuario = usuarioDB
      usuario.google = true
    }

    await usuario.save()

    const token = await generarJWT(usuario.id)

    res.json({
      ok: true,
      email,
      name,
      picture,
      token,
      menu: getMenuFrontEnd(usuario.role)
    })
  } catch (error) {
    console.log(error)
    res.status(401).json({
      ok: false,
      msg: 'Token no es correcto'
    })
  }
}

const renewToken = async (req, res = response) => {
  const uid = req.uid

  const token = await generarJWT(uid)

  const usuario = await Usuario.findById(uid)

  res.json({
    ok: true,
    token,
    usuario
  })
}

module.exports = {
  login,
  googleSingIn,
  renewToken
}
