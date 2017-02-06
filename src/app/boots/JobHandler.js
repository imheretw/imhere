import Logable from 'Logable';
import MyJob from '../jobs/MyJob';

export default class JobHandler extends Logable {
  constructor() {
    super();

    this.jobs = [
      new MyJob(),
    ];

    this.logger.info(`${this.constructor.name} created`);
  }

  start() {
    this.jobs.forEach((job) => {
      job.init();
    });
    this.logger.info(`start ${this.constructor.name}`);
  }
}
