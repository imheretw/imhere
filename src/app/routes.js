import GithubController from 'controllers/api/GithubController';
import UsersController from 'controllers/api/UsersController';
import { Router } from 'express';

const router = new Router({ mergeParams: true });

export default router;

function route(method, path, controller, actionName) {
  const func = router[method];
  const { action, middlewares } = controller.action(actionName);
  func.call(router, path, middlewares || [], action);
}

route('get', '/api/users', UsersController, 'index');
route('post', '/api/users', UsersController, 'store');
route('get', '/api/users/current', UsersController, 'currentUser');
route('post', '/api/users/login', UsersController, 'login');

route('get', '/api/github/closed_issues', GithubController, 'closedIssues');
