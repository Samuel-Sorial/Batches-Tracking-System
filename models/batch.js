/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const sequence = require('./sequence');

const batchSchema = new mongoose.Schema({
  size: { type: String, enum: ['S', 'M', 'L', 'XL'], required: true },
  color: {
    type: String,
    enum: ['red', 'blue', 'black', 'green'],
    required: true,
  },
  quantity: { type: Number, min: 1, index: 1 },
  number: { type: Number, min: 1, index: 1 },
});

/**
 * @todo
 * @param {String} modelName
 * @returns {Number} next sequence number
 */
const getNumber = async () => {};

batchSchema.statics.newBatch = async function (batch) {
  const nextNumber = await getNumber('batch');
  return new this({ ...batch, number: nextNumber });
};

module.exports = mongoose.model('Batch', batchSchema);
