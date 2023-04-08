const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE',
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  google: {
    type: Boolean,
    default: false
  }
})

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject()
  usuario.uid = _id
  return usuario
}

module.exports = model('Usuario', UsuarioSchema)