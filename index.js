const { app, mongooseConnection } = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

// Start application only after connecting successfully to mongodb
mongooseConnection
  .then(() => {
    logger.info('Connected Successfully to MongoDB');
    app.listen(config.PORT, () =>
      logger.info('Server is running successfully on port', config.PORT)
    );
  })
  .catch((err) => logger.error(err));
