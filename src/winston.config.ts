import * as winston from 'winston';
import 'winston-daily-rotate-file';

let loggerInstance: winston.Logger | null = null;

const createLoggerInstance = (): winston.Logger => {
  const logDir = process.env.LOG_DIR || 'logs';
  const maxSize = process.env.LOG_MAX_SIZE || '4m';
  const maxFiles = process.env.LOG_MAX_FILES || '7d';
  const fileName = process.env.LOG_FILE_NAME || 'application';

  const transports = [
    new winston.transports.Console({
      level: 'http',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
        winston.format.colorize(),
        winston.format.printf(
          ({ timestamp, level, message, context, trace, service, stack }) => {
            return `[\x1b[34m${timestamp}\x1b[0m] [\x1b[36m${service}\x1b[0m] [\x1b[33m${context}\x1b[0m] [${level}]: ${message}${
              stack ? `\n${stack}` : ''
            }${trace ? `\n${trace}` : ''}`;
          },
        ),
      ),
    }),
    new winston.transports.DailyRotateFile({
      level: 'error',
      filename: `${logDir}/${fileName}-error-%DATE%`,
      extension: '.log',
      datePattern: 'YYYY-MM-DD',
      maxSize,
      maxFiles,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
    new winston.transports.DailyRotateFile({
      level: 'http',
      filename: `${logDir}/${fileName}-info-%DATE%`,
      extension: '.log',
      datePattern: 'YYYY-MM-DD',
      maxSize,
      maxFiles,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ];

  return winston.createLogger({
    level: 'http',
    format: winston.format.combine(
      winston.format.json(),
      winston.format.errors({ stack: true }),
    ),
    transports,
    defaultMeta: {
      service: process.env.SERVICE_NAME || 'logger',
    },
  });
};

export const getLogger = (): winston.Logger => {
  if (!loggerInstance) {
    loggerInstance = createLoggerInstance();
  }
  return loggerInstance;
};
