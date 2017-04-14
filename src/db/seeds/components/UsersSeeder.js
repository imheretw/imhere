import _ from 'lodash';
import Seeder from './Seeder';
import users from '../data/users';

export default class UsersSeeder extends Seeder {
  run() {
    const promises = users.map((user) => {
      user = Object.assign(user, {
        created_at: new Date(),
        updated_at: new Date(),
      });

      user = _.omitBy(user, (value, key) => _.startsWith(key, 'join'));
      return this.knex('users').insert(user);
    });

    return Promise.all(promises);
  }
}
