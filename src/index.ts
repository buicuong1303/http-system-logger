import logger from './winston.config'

export class Logger {
  constructor(private readonly context: string) {}
  info(message: string, context?: string) {
    logger.info(message, { context: context || this.context })
  }

  error(message: string, trace: string = '', context?: string) {
    logger.error(message, { context: context || this.context, trace })
  }

  warn(message: string, context?: string) {
    logger.warn(message, { context: context || this.context })
  }

  debug(message: string, context?: string) {
    logger.debug(message, { context: context || this.context })
  }
}

export { default as httpLogger } from './morgan.config'
