/* eslint-disable global-require */
// Attaching ENV variables to the process
require('dotenv').config();

const { PORT } = process.env;

// Determine which database to use
let { MONGODB_URI } = process.env;
if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
} else if (process.env.NODE_ENV === 'development') {
  MONGODB_URI = process.env.DEVELOPMENT_MONGODB_URI;
}

module.exports = { PORT, MONGODB_URI };
