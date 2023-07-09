require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./database/config')
const { path } = require('path')

const app = express()

app.use(cors())

app.use(express.static('public'))

app.use(express.json())

dbConnection()

app.use('/api/usuarios', require('./routes/usuarios'))

app.use('/api/hospitales', require('./routes/hospitales'))

app.use('/api/medicos', require('./routes/medicos'))

app.use('/api/todo', require('./routes/busquedas'))

app.use('/api/upload', require('./routes/uploads'))

app.use('/api/login', require('./routes/auth'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

// app.get('/api/usuarios', (req, res) => {
//   res.json({
//     ok: true,
//     usuarios: [
//       { id: 1, nombre: 'Juan' }
//     ]
//   })
// })

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
