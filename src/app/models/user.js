import bcrypt from 'bcrypt';
import { ModelBase } from '../../database';
import config from 'config/appConfig';

export const TYPE_DEMO_USER = 'DemoUser';
export const TYPE_LIMITED_ACCESS_USER = 'LimitedAccessUser';
export const FULL_ACCESS_USER = 'FullAccessUser';

const User = ModelBase.extend({
  tableName: 'users',
  hasTimestamps: true,

  validatePassword(candidatePassword, cb) {
    let cryptedPassword = bcrypt.hashSync(candidatePassword, config.auth.bcryptSalt);
    if (cryptedPassword === this.get('encrypted_password')) {
      cb(null, true);
    } else {
      cb('password is invalid');
    }
  },
});

User.findOrCreate = async function (attributes, transacting) {
  return User
        .findOne({ email: attributes.email }, { transacting })
        .then((user) => {
          logger.debug(attributes.email);
          logger.debug(`user found by email ${attributes.email}`);
          return user;
        })
        .catch((err) => {
          logger.debug(`user does not exist by email ${attributes.email}`);
          return User.forge(attributes).save(null, { transacting });
        });
};

export default User;
