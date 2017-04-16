import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import Logable from 'Logable';
import User from 'app/models/user';

export default class PassportHandler extends Logable {
  constructor() {
    super();

    this.logger.info(`${this.constructor.name} created`);
  }

  start() {
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      User
        .forge({ id }).fetch()
        .then((user) => {
          done(null, user.toJSON());
        });
    });

    /**
     * Sign in using Email and Password.
     */
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      const ERROR_MSG = 'Account or password error.';
      const errorCallback = cb => cb(null, false, { msg: ERROR_MSG });
      const user = await User.forge({ email: email.toLowerCase() }).fetch();

      if (!user) {
        errorCallback(done);
        return;
      }

      // Validate user password
      user.validatePassword(password, (err, isValid) => {
        if (err) {
          errorCallback(done);
          return;
        }

        // If the password was not valid
        if (!isValid) {
          errorCallback(done);
          return;
        }

        done(null, user.toJSON());
      });
    }));
  }
}

/**
 * Login Required middleware.
 */
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
export const isAuthorized = (req, res, next) => {
  // const provider = req.path.split('/').slice(-1)[0];

  // if (_.find(req.user.tokens, { kind: provider })) {
  //   next();
  // } else {
  //   res.redirect(`/auth/${provider}`);
  // }
  next();
};
