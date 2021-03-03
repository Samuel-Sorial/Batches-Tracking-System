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
 * @returns {Number} next sequence number
 */
const getNumber = async () => {
  const sequenceNumber = await sequence.findOneAndUpdate(
    { name: 'batch' },
    { $inc: { number: 1 } },
    { new: true }
  );
  return sequenceNumber.number;
};

batchSchema.statics.newBatch = async function (batch) {
  const nextNumber = await getNumber();
  return new this({ ...batch, number: nextNumber });
};

module.exports = mongoose.model('Batch', batchSchema);
