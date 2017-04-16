import { Router } from 'express';

import ApplicationController from 'controllers/ApplicationController';
import GithubController from 'controllers/api/GithubController';
import UsersController from 'controllers/api/UsersController';

import Logger from 'Logger';

const router = new Router({ mergeParams: true });
const logger = new Logger('UserController');

export default router;

function route(method, path, controller, actionName) {
  const func = router[method];
  const { action, middlewares } = controller.action(actionName);
  func.call(router, path, middlewares || [], action);
}

function resource(path, controller) {
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
    route(setting.method, `${path}${setting.url}`, controller, setting.action);
  });
}

route('get', '/', ApplicationController, 'index');

route('get', '/api/users/current', UsersController, 'currentUser');
route('post', '/api/users/login', UsersController, 'login');
resource('/api/users', UsersController);

route('get', '/api/github/closed_issues', GithubController, 'closedIssues');
