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
  quantity: { type: Number, required: true, min: 1, index: 1 },
  number: { type: Number, required: true, min: 1, index: 1 },
});

// Adding compund index to optimize the group aggregation using them
batchSchema.index({ size: 1, color: 1 });

/**
 * @async
 * Atomically gets the next number
 * @returns {Number} next sequence number
 */
const getNumber = async () => {
  const sequenceNumber = await sequence.findOneAndUpdate(
    { name: 'batch' },
    { $inc: { last: 1 } },
    { new: true }
  );
  return sequenceNumber.last;
};

batchSchema.statics.newBatch = async function (batch) {
  const nextNumber = await getNumber();
  return new this({ ...batch, number: nextNumber });
};

batchSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Batch', batchSchema);
