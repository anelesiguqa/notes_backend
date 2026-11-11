const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')
const app = express()

logger.info(`connecting to ${config.MONGODB_URI}`);

(async() => {
  try {
    await mongoose.connect(config.MONGODB_URI, { family: 4 })
    logger.info('connected to MongoDB')
  } catch (err) {
    logger.error('error connection to MongoDB:', err.message)
  }
})()

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app