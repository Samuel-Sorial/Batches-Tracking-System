const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  size: { type: String, enum: ['S', 'M', 'L', 'XL'], required: true },
  color: {
    type: String,
    enum: ['red', 'blue', 'black', 'green'],
    required: true,
  },
  quantity: { type: Number, min: 1, index: 1 },
});

module.exports = mongoose.model('Batch', batchSchema);
