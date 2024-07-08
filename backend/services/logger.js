const winston = require('winston');

module.exports = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logfile.log' }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Enable colorized output
        winston.format.prettyPrint(), // Enable pretty print
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
    }),
  ],
});
