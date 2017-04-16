import { Router } from 'gocool';

import ApplicationController from './controllers/ApplicationController';
import GithubController from './controllers/api/GithubController';

const router = new Router();

router.route('get', '/api/closed_issues', GithubController, 'closedIssues');

router.route('get', '/', ApplicationController, 'index');
router.route('get', '/closed_issues', ApplicationController, 'closedIssues');

export default [router.expressRouter];
