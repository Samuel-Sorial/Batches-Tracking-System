const { validSizes, validColors } = require('./DataSamples.json');

/**
 * Calls api to create given number of batches with random data
 * @param {Number} max
 * @returns {Array<Promise>}
 */
const addBatches = (max, api) => {
  const batchesPromises = [];
  for (let i = 0; i < max; i += 1) {
    const color = validColors[Math.floor(Math.random() * validColors.length)];
    const size = validSizes[Math.floor(Math.random() * validSizes.length)];
    batchesPromises.push(
      api
        .post('/api/batches')
        .send({ size, color, quantity: Math.floor(Math.random() * 1000) })
    );
  }
  return batchesPromises;
};

module.exports = { addBatches };
