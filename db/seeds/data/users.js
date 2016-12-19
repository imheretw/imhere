import bcrypt from 'bcrypt';
import config from '../../../src/config/appConfig';

const users = [{
  id: 1,
  name: 'Test',
  email: 'test@test.com',
  encrypted_password: bcrypt.hashSync('123456', config.auth.bcryptSalt),
}];

export default users;
