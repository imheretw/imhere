'use strict';

// this controller is meant to set up routes from all other controllers
// it also sets up basic express routes

import jwt from 'jsonwebtoken';
import { Router } from 'express';

import config from 'config/appConfig';
import User from 'models/user';
import usersController from './api/usersController';
import githubController from './api/githubController';

// create router
const router = Router();

// api router
router.use((req, res, next) => {
  if (req.path === '/') {
    return next();
  }

  // TODO: refactoring verify jwt token, is it possible add requiredLogin setting to each API?
  if (req.path === '/api/users/login') {
    return next();
  }

  if (req.path === '/api/users') {
    return next();
  }

  if (req.path.match(/^\/api\/github\/.*/)) {
    return next();
  }

  if (req.path.match(/^\/api\/webhooks\/.*/)) {
    return next();
  }

  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ error: 'require jwt token' });
  }

  jwt.verify(token, config.auth.jwt, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'invalid jwt token' });
    }

    // load user into req.user
    User
      .query({ where: { id: user.id } })
      .fetch()
      .then((user) => {
        if (!user) {
          return res.status(401).send({ error: 'invalid jwt token' });
        }

        req.user = user;
        next();
      })
      .catch((error) => {
        res.status(500).send({ error });
      });
  }); // end of jwt verify
});

// load other controllers
router.use('/api/users', usersController);
router.use('/api/github', githubController);

// set basic routes
router.get('/', (req, res, next) => res.render('index', {
  title: 'imhere',
}));

// export router
export default router;
