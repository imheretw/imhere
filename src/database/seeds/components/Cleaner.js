import knexCleaner from 'knex-cleaner';
import Seeder from './Seeder';

export default class Cleaner extends Seeder {
  run() {
    const options = {
      mode: 'truncate', // Valid options 'truncate', 'delete'
      ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
    };

    return knexCleaner.clean(this.knex, options);
  }
}
