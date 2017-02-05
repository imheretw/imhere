'use strict';

// this controller is meant to set up routes from all other controllers
// it also sets up basic express routes

import { Router } from 'express';

import usersController from './api/usersController';
import githubController from './api/githubController';

// create router
const router = Router();

// load other controllers
router.use('/api/users', usersController);
router.use('/api/github', githubController);

// set basic routes
router.get('/', (req, res, next) => res.render('index', {
  title: 'imhere',
}));

// export router
export default router;
