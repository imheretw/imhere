'use strict';

import winston from 'winston';

export default function Logger(prefix) {
  const logger = new winston.Logger({
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

  const levels = ['debug', 'verbose', 'info', 'warn', 'error'];

  return levels.reduce((acc, level) => {
    // add prefix
    acc[level] = (...args) => logger[level].apply(logger, formatLog(prefix, args));

    return acc;
  }, {});
}

function formatLog(prefix, args) {
  return prefix ? [`${prefix}:`, ...args] : [...args];
}
