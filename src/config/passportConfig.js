
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import User from 'app/models/user';

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
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  const ERROR_MSG = 'Account or password error.';

  User
    .forge({
      email: email.toLowerCase(),
    }).fetch()
    .then((user) => {
      if (!user) {
        return done(null, false, { msg: ERROR_MSG });
      }

      // Validate user password
      return user.validatePassword(password, (err, isValid) => {
        if (err) {
          return done(null, false, {
            msg: ERROR_MSG,
          });
        }

        // If the password was not valid
        if (!isValid) {
          return done(null, false, { msg: ERROR_MSG });
        }

        return done(null, user.toJSON());
      });
    });
}));

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  // const provider = req.path.split('/').slice(-1)[0];

  // if (_.find(req.user.tokens, { kind: provider })) {
  //   next();
  // } else {
  //   res.redirect(`/auth/${provider}`);
  // }
  next();
};
