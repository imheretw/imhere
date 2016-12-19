import factory from 'factory-girl';
import User from 'models/user';

factory.define('user', User, {
  id: factory.seq('User.id', (n) => n),
  name: factory.seq('User.name', (n) => `name${n}`),
  email: factory.seq('User.email', (n) => `user${n}@test.com`),
  encrypted_password: factory.seq('User.encrypted_password', (n) => `encrypted_password${n}`),
});

export default factory;
