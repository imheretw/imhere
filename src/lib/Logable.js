import Logger from 'Logger';

export default class Logable {
  constructor() {
    this.logger = new Logger(this.constructor.name);
  }
}
