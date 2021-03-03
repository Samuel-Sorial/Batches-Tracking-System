const Batch = require('../models/batch');

/**
 * Creates a new batch if the given data is valid
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
module.exports.createBatch = async (request, response, next) => {
  Batch.newBatch({ ...request.body })
    .then((batch) => batch.save())
    .then((batch) => response.status(201).send(batch))
    .catch(() => next(new TypeError('Invalid Data')));
};
