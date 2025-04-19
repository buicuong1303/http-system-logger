import { getLogger } from './winston.config';

export class Logger {
  private readonly logger = getLogger();

  constructor(private readonly context: string) {}

  info(message: string, context?: string) {
    this.logger.info(message, { context: context || this.context });
  }

  error(message: string, trace: string = '', context?: string) {
    this.logger.error(message, { context: context || this.context, trace });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context: context || this.context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context: context || this.context });
  }
}

export { default as httpLogger } from './morgan.config';
