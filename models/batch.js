/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

/**
 * Converts object id to a number
 * @param {mongoose.Types.ObjectId} id
 * @returns {Number} unique number that always will refer to same object
 */
const convertIdToNumber = (id) => {
  // Cut the id and only use PID, INC of this object id,
  // for more information: https://stackoverflow.com/a/58024069/13089670
  const number = id.toHexString().substr(14);
  return number;
};

const batchSchema = new mongoose.Schema({
  size: { type: String, enum: ['S', 'M', 'L', 'XL'], required: true },
  color: {
    type: String,
    enum: ['red', 'blue', 'black', 'green'],
    required: true,
  },
  quantity: { type: Number, min: 1, index: 1 },
});

batchSchema.virtual('number').get(function () {
  return convertIdToNumber(this._id);
});

batchSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.number = convertIdToNumber(returnedObject._id);
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Batch', batchSchema);
