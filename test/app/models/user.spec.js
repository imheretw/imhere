import bcrypt from 'bcrypt';
import { expect } from 'chai';
import User from 'models/user';
import config from 'config/appConfig';

describe('Test User Model', function () {
  describe('validatePassword', () => {
    let user;

    before(() => {
      let cryptedPassword = bcrypt.hashSync('123', config.auth.bcryptSalt);
      user = new User({
        encrypted_password: cryptedPassword,
      });
    });

    it('should validate correct password', (done) => {
      user.validatePassword('123', (error, result) => {
        expect(error).be.falsy;
        done();
      });
    });

    it('should fail to validate correct password', (done) => {
      user.validatePassword('111', (error, result) => {
        expect(error).be.not.null;
        done();
      });
    });
  });
});
