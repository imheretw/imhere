import Logger from 'logger';

export default class Logable {
  constructor() {
    this.logger = Logger(this.constructor.name);
  }
}
