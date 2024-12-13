import pino, { Logger } from 'pino'

export const consoleTransport = pino.transport({
  targets: [
    {
      level: 'trace',
      target: 'pino-pretty',
      options: {
        colorize: true, // Add colors
        // levelFirst: true, // Print log level first
        // translateTime: 'SYS:standard', // Human-readable timestamp
      },
    },
  ],
})

export const fileTransport = pino.transport({
  targets: [
    {
      level: 'trace',
      target: 'pino/file',
      options: {
        destination: './log.ndjson',
        autoEnd: true,
      },
    },
  ],
})

export const logger = pino({ level: 'trace', timestamp: pino.stdTimeFunctions.isoTime }, consoleTransport)

export class PinoLogger {
  logger: Logger

  constructor(logger: Logger) {
    this.logger = logger
  }

  test(message: string, data?: Record<string, any> | undefined): void {
    this.logger.debug(data || {}, message)
  }

  trace(message: string, data?: Record<string, any> | undefined): void {
    this.logger.trace(data || {}, message)
  }

  debug(message: string, data?: Record<string, any> | undefined): void {
    this.logger.debug(data || {}, message)
  }

  info(message: string, data?: Record<string, any> | undefined): void {
    this.logger.info(data || {}, message)
  }

  warn(message: string, data?: Record<string, any> | undefined): void {
    this.logger.warn(data || {}, message)
  }

  error(message: string, data?: Record<string, any> | undefined): void {
    this.logger.error(data || {}, message)
  }

  fatal(message: string, data?: Record<string, any> | undefined): void {
    //console.dir(data)
    this.logger.fatal(data || {}, message)
  }
}
