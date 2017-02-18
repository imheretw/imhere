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
import Bootstrap from './Bootstrap';

// TODO should move local packages out of framework
import Logger from 'logger';
import database from 'database';

export default class Sever {
  constructor({ rootPath, config }) {
    this._config = config;

    this._resetPaths(rootPath);
    this._setGlobalVariables();
  }

  start() {
    const logger = Logger('Server');

    // EXPRESS SET-UP
    // create app
    const app = express();

    // bootstrap
    // run handlers in app/boots
    new Bootstrap({ bootsPath: this._paths.boots }).start();

    // use pug and set views and static directories
    app.set('view engine', 'pug');
    app.set('views', path.join(this._paths.app, 'views'));
    app.use(express.static(path.join(this._paths.root, 'static')));

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
    app.use('/', require(this._paths.controllers).default);

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
          stack: this._config.env === 'development' ? err.stack : '',
        });
      } else {
        res.json({
          error: err.message,
        });
      }
    });

    // START AND STOP
    this.expressServer = app.listen(this._config.port, () => {
      logger.info(`listening on port ${this._config.port}`);
    });
    process.on('SIGINT', () => {
      logger.info('shutting down!');
      database.close();
      this.expressServer.close();
      process.exit();
    });

    process.on('uncaughtException', (error) => {
      logger.error(`uncaughtException: ${error.message}`);
      logger.error(error.stack);
      process.exit(1);
    });
  }

  _setGlobalVariables() {
    global.App = global.App || {};

    global.App.config = this._config;
  }

  _resetPaths(rootPath) {
    this._paths = {};
    this._paths.root = rootPath;
    this._paths.app = `${rootPath}/app`;
    this._paths.boots = `${this._paths.app}/boots`;
    this._paths.controllers = `${this._paths.app}/controllers`;
  }
}
