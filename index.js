require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./database/config')

const app = express()

app.use(cors())

dbConnection()

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Hello World' })
})

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
