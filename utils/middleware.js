const logger = require('./logger');

/**
 * Loggs each coming request
 * @module requestLogger
 * @function
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method);
  logger.info('Path: ', request.path);
  if (request.query) {
    logger.info('Query: ', request.query);
  }
  logger.info('Body: ', request.body);
  next();
};

/**
 * Handles not found endpoint
 * @module notFound
 * @function
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
const notFound = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

/**
 * Handles errors
 * @module errorHandler
 * @function
 * @param {Error} error
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error instanceof TypeError) {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = { requestLogger, notFound, errorHandler };
