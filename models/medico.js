const { Schema, model } = require('mongoose')

const MedicoSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  img: {
    type: String
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El id usuario es un campo obligatorio']
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
    required: [true, 'El id hospital es un campo obligatorio']
  }
})

MedicoSchema.methods.toJSON = function () {
  const { __v, ...object } = this.toObject()
  return object
}

module.exports = model('Medico', MedicoSchema)
