import jwt from 'jsonwebtoken';
import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';

import User from 'models/user';
import jwtMiddleware from 'middlewares/jwtMiddleware';
import config from 'config/appConfig';
import wrap from 'helpers/wrap';
import Logger from 'logger';

const logger = Logger('UserController');
const router = Router();
const expiresIn = 60 * 60 * 24 * 30;

/*
*  GET /users
*/
router.get('/', wrap(async (req, res, next) => {
  const users = await User
              .forge()
              .orderBy('name')
              .fetchPage({
                page: req.query.page || 1,
                pageSize: req.query.size || 50,
              });

  res.json({ users, pagination: users.pagination });
}));

/*
*  POST /users
*/
router.post('/', wrap(async (req, res, next) => {
  try {
    const attributes = {
      email: req.body.email,
      name: req.body.name,
      encrypted_password: bcrypt.hashSync(req.body.password, config.auth.bcryptSalt),
    };

    const userModel = await User.create(attributes);
    const userJSON = userModel.toJSON();
    const token = jwt.sign(userJSON, config.auth.jwt, { expiresIn });

    res.status(201).json({ user: userJSON, token });
  } catch (error) {
    logger.error('create user error', error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}));

/*
*  POST /users/login
*/
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (!user) {
      return res.status(401).json({ error: 'Email or password error.' });
    }

    const token = jwt.sign(user, config.auth.jwt, { expiresIn });
    return res.json({ token, user });
  })(req, res, next);
});

/*
*  GET /users/current
*/
router.get('/current', jwtMiddleware, (req, res, next) => res.json(req.user));

export default router;
