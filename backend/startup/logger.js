import logger from '../services/logger.js';

export default () => {
  process.on('uncaughtException', (ex) => {
    logger.error(ex.message, ex);
  });

  process.on('unhandledException', (ex) => {
    logger.error(ex.message, ex);
  });
};
