// Importing express to make it easier to annotate request, response, next
// eslint-disable-next-line no-unused-vars
const express = require('express');
const logger = require('./logger');

/**
 * Loggs each coming request
 * @module requestLogger
 * @function
 * @param {express.Request} request
 * @param {express.Response} response
 * @param {express.NextFunction} next
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
 * @param {express.Request} request
 * @param {express.Response} response
 * @param {express.NextFunction} next
 */
const notFound = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

/**
 * Handles errors
 * @module errorHandler
 * @function
 * @param {Error} error
 * @param {express.Request} request
 * @param {express.Response} response
 * @param {express.NextFunction} next
 */
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error instanceof TypeError) {
    response.status(400).json({ error: error.message });
  } else {
    next(error);
  }
};

module.exports = { requestLogger, notFound, errorHandler };
