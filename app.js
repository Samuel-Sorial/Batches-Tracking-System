const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const apiRouter = require('./routers/api');

const app = express();

// Connecting to MongoDB
logger.info('Connecting to MongoDB using:', config.MONGODB_URI);
const mongooseConnection = mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Attaching middlewares to the application
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(middleware.requestLogger);
}
app.use('/api', apiRouter);
app.use(middleware.notFound);
app.use(middleware.errorHandler);

module.exports = { mongooseConnection, app };
