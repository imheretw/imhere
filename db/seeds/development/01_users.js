import _ from 'lodash';

import users from '../data/users';

exports.seed = (knex, Promise) => {
  const usersPromise = users.map((user) => {
    user = Object.assign(user, {
      created_at: new Date(),
      updated_at: new Date(),
    });

    user = _.omitBy(user, (value, key) => _.startsWith(key, 'join'));
    return knex('users').insert(user);
  });

  return Promise.all(usersPromise);
};
