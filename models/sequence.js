const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  last: { type: Number, required: true, min: 1 },
});

module.exports = mongoose.model('Sequence', sequenceSchema);
