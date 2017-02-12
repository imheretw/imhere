import Logable from 'Logable';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import User from 'models/user';

export default class PassportHandler extends Logable {
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
      const errorCallback = (done) => done(null, false, { msg: ERROR_MSG });
      const user = await User.forge({ email: email.toLowerCase() }).fetch();

      if (!user) {
        return errorCallback(done);
      }

      // Validate user password
      user.validatePassword(password, (err, isValid) => {
        if (err) {
          return errorCallback(done);
        }

        // If the password was not valid
        if (!isValid) {
          return errorCallback(done);
        }

        return done(null, user.toJSON());
      });
    }));

    this.logger.info(`start ${this.constructor.name}`);
  }
}
