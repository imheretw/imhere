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

export default class Server {
  constructor({ config, routes }) {
    this._logger = new Logger('Server');
    this._app = null;
    this._expressServer = null;
    this._handlers = [];
    this._config = config;

    this.setRoutes(routes);

    this._initApp();
  }

  start() {
    this._logger.debug('Starting Server...');

    this._initRoutes();
    this._initExpressServer();

    return this;
  }

  setRoutes(routes) {
    this._routes = routes || [];

    return this;
  }

  addHandlers(handlers) {
    this._handlers = [
      ...this._handlers,
      ...handlers,
    ];

    handlers.forEach(handler => handler.start());

    return this;
  }

  addPlugin(routePath, Plugin) {
    const plugin = new Plugin();
    const routes = plugin.getRoutes();
    this._app.use(routePath, routes);

    return this;
  }

  _initRoutes() {
    // use kue for background jobs handler
    // visit http://localhost:5000/kue to see queued background jobs
    this._app.use('/kue', kue.app);

    if (this._routes) {
      // routes
      this._app.use('/', this._routes);
      // catch 404 and forward to error handler
      this._app.use((req, res, next) => {
        const err = new Error('Route Not Found');
        err.statusCode = 404;
        next(err);
      });
    }

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

    return this;
  }

  _initApp() {
    // EXPRESS SET-UP
    // create app
    this._app = express();

    // use pug and set views and static directories
    this._app.set('view engine', 'pug');
    this._app.set('views', this._config.path.view);
    this._app.use(express.static(this._config.path.static));

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

    // passport for authenticate
    this._app.use(passport.initialize());
    this._app.use(passport.session());
  }

  _initExpressServer() {
    this.setRoutes();
    // START AND STOP
    this._expressServer = this._app.listen(this._config.port, () => {
      this._logger.info(`Started server and listening on port ${this._config.port}`);
    });

    process.on('SIGINT', () => {
      this._logger.info('Server shutting down!');
      this._expressServer.close();
      process.exit();
    });

    process.on('uncaughtException', (error) => {
      this._logger.error(`uncaughtException: ${error.message}`);
      this._logger.error(error.stack);
      process.exit(1);
    });
  }

  get expressServer() {
    return this._expressServer;
  }
}
