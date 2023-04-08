require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./database/config')

const app = express()

app.use(cors())

app.use(express.json())

dbConnection()

app.use('/api/usuarios', require('./routes/usuarios'))

app.use('/api/login', require('./routes/auth'))

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
