const Batch = require('../models/batch');
const logger = require('../utils/logger');
/**
 * Creates a new batch if the given data is valid
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
module.exports.createBatch = async (request, response, next) => {
  Batch.newBatch({ ...request.body })
    .then((batch) => batch.save())
    .then((batch) => {
      response.status(201).send(batch);
    })
    .catch(() => next(new TypeError('Invalid Data')));
};

/**
 * Finds batches or group them if asked in the query
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
module.exports.findBatches = async (request, response, next) => {
  // Return all the data
  if (!request.query.group) {
    Batch.find({})
      .then((batches) => response.send(batches))
      .catch((error) => {
        logger.error(error);
        next(new Error());
      });
  }
  // Group them by size and color
  else {
    Batch.aggregate([
      {
        $group: {
          _id: { color: '$color', size: '$size' },
          quantity: { $sum: '$quantity' },
        },
      },
      {
        $sort: {
          quantity: 1,
        },
      },
    ])
      .then((result) => response.send(result))
      .catch((error) => {
        logger.error(error);
        next(new Error());
      });
  }
};
