'use strict';

import winston from 'winston';

export default new winston.Logger({
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
