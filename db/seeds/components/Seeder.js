import { bookshelf } from 'database';
import Logger from 'logger';

export default class Seeder {
  constructor() {
    this.knex = bookshelf.knex;
    this.logger = Logger(this.constructor.name);
  }

  async run() {
    this.logger.debug('run default method! Should override me');
  }
}
