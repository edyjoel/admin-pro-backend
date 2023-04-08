const { Schema, model } = require('mongoose')

const HospitalSchema = Schema({
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
    required: true
  }
}, { collection: 'hospitales' })

HospitalSchema.methods.toJSON = function () {
  const { __v, ...object } = this.toObject()
  return object
}

module.exports = model('Hospital', HospitalSchema)
