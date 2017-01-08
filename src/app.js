'use strict';

// built-in
import path from 'path';

// external
import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import params from 'strong-params';
import dotenv from 'dotenv';
import kue from 'kue';

dotenv.config();

// local
import './config/passportConfig';
import controllers from './app/controllers';
import logger from './lib/logger';
import database from './database';
import config from './config/appConfig';
import JobHandler from './app/boots/JobHandler';

// Add global
global.logger = logger;

// EXPRESS SET-UP
// create app
const app = express();

// path to root directory of this app
const rootPath = path.normalize(__dirname);

// start background jobs handler
new JobHandler().start();

// use pug and set views and static directories
app.set('view engine', 'pug');
app.set('views', path.join(rootPath, 'app/views'));
app.use(express.static(path.join(rootPath, 'static')));

//add middlewares
app.use(bodyParser.json({
  verify(req, res, buf) {
    req.rawBody = buf;
  },
}));
app.use(bodyParser.urlencoded({
  extended: true,
  verify(req, res, buf) {
    req.rawBody = buf;
  },
}));
app.use(compress());
app.use(cookieParser());
app.use(helmet());
app.use(params.expressMiddleware());

// use kue for background jobs handler
// visit http://localhost:5000/kue to see queued background jobs
app.use('/kue', kue.app);

// passport for authenticate
app.use(passport.initialize());
app.use(passport.session());

// set all controllers
app.use('/', controllers);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Route Not Found');
  err.statusCode = 404;
  next(err);
});

// general errors
app.use((err, req, res, next) => {
  const sc = err.statusCode || 500;
  res.status(sc);

  logger.error(
    'Error on status', sc, err.stack
  );

  if (sc === 500) {
    res.render('error', {
      status: sc,
      message: err.message,
      stack: config.env === 'development' ? err.stack : '',
    });
  } else {
    res.json({
      error: err.message,
    });
  }
});

// START AND STOP
const server = app.listen(config.port, () => {
  logger.info(`listening on port ${config.port}`);
});
process.on('SIGINT', () => {
  logger.info('shutting down!');
  database.close();
  server.close();
  process.exit();
});

process.on('uncaughtException', (error) => {
  logger.error(`uncaughtException: ${error.message}`);
  logger.error(error.stack);
  process.exit(1);
});

module.exports = server;
