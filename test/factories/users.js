import factory from 'factory-girl';
import bcrypt from 'bcrypt';
import User from 'models/user';
import config from 'config/appConfig';

factory.define('user', User, {
  id: factory.seq('User.id', n => n),
  name: factory.seq('User.name', n => `name${n}`),
  email: factory.seq('User.email', n => `user${n}@test.com`),
  encrypted_password: bcrypt.hashSync('123', config.auth.bcryptSalt),
});

export default factory;
