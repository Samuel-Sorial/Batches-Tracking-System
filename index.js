/* eslint-disable global-require */
const { app, mongooseConnection } = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

// Start application only after connecting successfully to mongodb
mongooseConnection
  .then(() => {
    logger.info('Connected Successfully to MongoDB');
    require('./utils/initialize');
    app.listen(config.PORT || 3001, () =>
      logger.info('Server is running successfully on port', config.PORT)
    );
  })
  .catch((err) => logger.error(err));
