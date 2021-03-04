// Importing express to make it easier to annotate request, response, next
// eslint-disable-next-line no-unused-vars
const express = require('express');
const Batch = require('../models/batch');
const logger = require('../utils/logger');
/**
 * Creates a new batch if the given data is valid
 * @param {express.Request} request
 * @param {express.Response} response
 * @param {express.NextFunction} next
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
 * @param {express.Request} request
 * @param {express.Response} response
 * @param {express.NextFunction} next
 */
module.exports.findBatches = async (request, response, next) => {
  // Return all the data without grouping
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
      {
        $project: {
          _id: 0,
          quantity: 1,
          color: '$_id.color',
          size: '$_id.size',
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
