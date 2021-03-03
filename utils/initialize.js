const Sequence = require('../models/sequence');

Sequence.findOne({ name: 'batch' }).then((result) => {
  if (!result) {
    new Sequence({ name: 'batch', last: 0 }).save();
  }
});
