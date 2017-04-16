import winston from 'winston';

export default class Logger {
  constructor(prefix) {
    this._prefix = prefix;
    this._logger = new winston.Logger({
      transports: [
        new winston.transports.Console({
          level: process.env.DEBUG_LEVEL,
          timestamp: true,
          stderrLevels: ['error'],
          colorize: true,
        }),
        new (winston.transports.File)({
          name: 'kidguard.debug.log',
          filename: 'logs/debug.log',
          humanReadableUnhandledException: true,
          json: false,
          level: 'debug',
        }),
      ],
    });

    ['debug', 'verbose', 'info', 'warn', 'error'].forEach((level) => {
      this[level] = (...args) => this._log('debug', args);
    });
  }

  _log(level, args) {
    const newArgs = this._appendPrefix(args);
    this._logger[level](...newArgs);
  }

  _appendPrefix(args) {
    return this._prefix ? [`${this._prefix}:`, ...args] : [...args];
  }
}
