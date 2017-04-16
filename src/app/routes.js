import { Router } from 'framework';

import ApplicationController from 'controllers/ApplicationController';
import GithubController from 'controllers/api/GithubController';
import UsersController from 'controllers/api/UsersController';

const router = new Router();

router.route('get', '/', ApplicationController, 'index');

router.route('get', '/api/users/current', UsersController, 'currentUser');
router.route('post', '/api/users/login', UsersController, 'login');
router.resource('/api/users', UsersController);

router.route('get', '/api/github/closed_issues', GithubController, 'closedIssues');

export default router.expressRouter;
