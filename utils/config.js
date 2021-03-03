// Attaching ENV variables to the process
require('dotenv').config();

const { PORT } = process.env;

let { MONGODB_URI } = process.env;
if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB;
}

module.exports = { PORT, MONGODB_URI };
