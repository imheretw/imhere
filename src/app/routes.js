import { Router } from 'gocool';

import ApplicationController from 'controllers/ApplicationController';
import UsersController from 'controllers/api/UsersController';

const router = new Router();

router.route('get', '/', ApplicationController, 'index');

router.route('get', '/api/users/current', UsersController, 'currentUser');
router.route('post', '/api/users/login', UsersController, 'login');
router.resource('/api/users', UsersController);

export default router.expressRouter;
