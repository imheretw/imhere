import { Router as ExpressRouter } from 'express';
import Logger from 'Logger';

const logger = new Logger('resource');

export default class Router {
  constructor() {
    this._router = new ExpressRouter({ mergeParams: true });
  }

  get expressRouter() {
    return this._router;
  }

  resource(path, controller) {
    const settings = [
      { method: 'get', action: 'index', url: '/' },
      { method: 'get', action: 'show', url: '/:id' },
      { method: 'post', action: 'store', url: '/' },
      { method: 'delete', action: 'delete', url: '/' },
      { method: 'put', action: 'update', url: '/update' },
      { method: 'patch', action: 'update', url: '/update' },
    ];

    settings.forEach((setting) => {
      logger.debug('register route:', setting.method, `${path}${setting.url}`, controller.name, setting.action);
      this.route(setting.method, `${path}${setting.url}`, controller, setting.action);
    });
  }

  route(method, path, controller, actionName) {
    const func = this._router[method];
    const { action, middlewares } = controller.action(actionName);
    func.call(this._router, path, middlewares || [], action);
  }
}
