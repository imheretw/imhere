import jwt from 'jsonwebtoken';
import passport from 'passport';
import bcrypt from 'bcrypt';

import { Controller } from 'framework';
import User from 'models/user';
import jwtMiddleware from 'middlewares/jwtMiddleware';
import config from 'config/appConfig';
import Logger from 'Logger';

const logger = new Logger('UserController');
const expiresIn = 60 * 60 * 24 * 30;

export default class UserController extends Controller {
  constructor() {
    super();
    // TODO: support this.before(['action-1', 'action-2'], middleware);
    this.before('currentUser', jwtMiddleware);
  }

  async index() {
    const users = await User
                .forge()
                .orderBy('name')
                .fetchPage({
                  page: this.req.query.page || 1,
                  pageSize: this.req.query.size || 50,
                });

    this.res.json({ users, pagination: users.pagination });
  }

  async show() {
    const user = await User.findOne({ id: this.req.params.id });

    this.res.json({ user });
  }

  async store() {
    try {
      const attributes = {
        email: this.req.body.email,
        name: this.req.body.name,
        encrypted_password: bcrypt.hashSync(this.req.body.password, config.auth.bcryptSalt),
      };

      const userModel = await User.create(attributes);
      const userJSON = userModel.toJSON();
      const token = jwt.sign(userJSON, config.auth.jwt, { expiresIn });

      this.res.status(201).json({ user: userJSON, token });
    } catch (error) {
      logger.error('create user error', error);
      this.res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  async login() {
    passport.authenticate('local', (err, user, info) => {
      if (!user) {
        return this.res.status(401).json({ error: 'Email or password error.' });
      }

      const token = jwt.sign(user, config.auth.jwt, { expiresIn });
      return this.res.json({ token, user });
    })(this.req, this.res, this.next);
  }

  async currentUser() {
    this.res.json(this.req.user);
  }
}
