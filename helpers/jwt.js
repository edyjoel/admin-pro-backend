const jwt = require('jsonwebtoken')

const generarJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '12h'
    }, (err, token) => {
      if (err) {
        console.log(err)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('No se pudo generar el JWT')
      } else {
        resolve(token)
      }
    })
  })
}

module.exports = {
  generarJWT
}
