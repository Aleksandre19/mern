const logger = require('../services/logger');

module.exports = () => {
  process.on('uncaughtException', (ex) => {
    logger.error(ex.message, ex);
  });

  process.on('unhandledException', (ex) => {
    logger.error(ex.message, ex);
  });
};
