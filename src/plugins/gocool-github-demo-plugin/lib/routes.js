import { Router } from 'gocool';

import GithubController from './controllers/GithubController';

const router = new Router();

router.route('get', '/closed_issues', GithubController, 'closedIssues');
router.route('get', '/', GithubController, 'index');

export default [router.expressRouter];
