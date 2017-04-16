import { bookshelf } from 'database';
import Logger from 'Logger';

export default class Seeder {
  constructor() {
    this.knex = bookshelf.knex;
    this.logger = new Logger(this.constructor.name);
  }

  async run() {
    this.logger.debug('run default method! Should override me');
  }
}
