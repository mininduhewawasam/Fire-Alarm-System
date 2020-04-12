const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
require('winston-daily-rotate-file');

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level} ${message}`;
})

const errorTransport = new transports.DailyRotateFile({
  filename: 'logs/error/%DATE%-error.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  handleExceptions: true,
  level: 'error'
})

const combinedTransport = new transports.DailyRotateFile({
  filename: 'logs/combined/%DATE%-combined.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  handleExceptions: true,
})

const logger = createLogger( {
  format: combine(timestamp(), customFormat),
  transports: [errorTransport, combinedTransport],
  exitOnError: false
})

logger.add(
  new transports.Console({
    handleExceptions: true,
    format: format.simple()
  })
)

module.exports = logger;