const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');

const app = express();
logger.info('Connecting to MongoDB using:', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info('Connected Successfully to MongoDB'))
  .catch((error) => logger.error(error));

app.use(express.json());

module.exports = app;
