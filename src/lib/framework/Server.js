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
import kue from 'kue';

// lib
import Logger from 'Logger';

// local
import routes from 'app/routes';

export default class Server {
  constructor(options) {
    this._logger = new Logger('Server');
    this._app = null;
    this._core = null;
    this._handlers = [];
    this._config = options.config;
  }

  start() {
    this._initApp();
    this._initCore();

    return this;
  }

  addHandlers(handlers) {
    this._handlers = [
      ...this._handlers,
      ...handlers,
    ];

    handlers.forEach(handler => handler.start());
  }

  _initApp() {
    // EXPRESS SET-UP
    // create app
    this._app = express();

    // path to root directory of this app
    const rootPath = path.normalize(__dirname);

    // use pug and set views and static directories
    this._app.set('view engine', 'pug');
    this._app.set('views', path.join(rootPath, 'app/views'));
    this._app.use(express.static(path.join(rootPath, 'static')));

    // add middlewares
    this._app.use(bodyParser.json({
      verify(req, res, buf) {
        req.rawBody = buf;
      },
    }));
    this._app.use(bodyParser.urlencoded({
      extended: true,
      verify(req, res, buf) {
        req.rawBody = buf;
      },
    }));
    this._app.use(compress());
    this._app.use(cookieParser());
    this._app.use(helmet());
    this._app.use(params.expressMiddleware());

    // use kue for background jobs handler
    // visit http://localhost:5000/kue to see queued background jobs
    this._app.use('/kue', kue.app);

    // passport for authenticate
    this._app.use(passport.initialize());
    this._app.use(passport.session());

    // set all controllers
    this._app.use('/', routes);

    // catch 404 and forward to error handler
    this._app.use((req, res, next) => {
      const err = new Error('Route Not Found');
      err.statusCode = 404;
      next(err);
    });

    // general errors
    this._app.use((err, req, res, next) => {
      const sc = err.statusCode || 500;
      res.status(sc);

      this._logger.error(
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
  }

  _initCore() {
    // START AND STOP
    this._core = this._app.listen(this._config.port, () => {
      this._logger.info(`listening on port ${this._config.port}`);
    });
    process.on('SIGINT', () => {
      this._logger.info('shutting down!');
      this._core.close();
      process.exit();
    });

    process.on('uncaughtException', (error) => {
      this._logger.error(`uncaughtException: ${error.message}`);
      this._logger.error(error.stack);
      process.exit(1);
    });
  }

  get core() {
    return this._core;
  }
}
