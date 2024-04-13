const express = require('express')
const routerApi = require('./routes')
const securityConfig = require('./middlewares/security.config')
const { checkApiKey } = require('./middlewares/auth.handler')

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler
} = require('./middlewares/error.handler')

const app = express()

// Middlewares
app.use(express.json())
app.use(securityConfig)
require('./utils/auth')

// Routes
app.get('/', (req, res) => {
  res.status(200).json('Hola mi server en express')
})
app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola, soy una nueva ruta')
})
routerApi(app)

// Error handlers
app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)


module.exports = app
