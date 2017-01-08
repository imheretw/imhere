import logger from 'logger';
import MyJob from '../jobs/MyJob';

export default class JobHandler {
  constructor() {
    this.jobs = [
      new MyJob(),
    ];

    logger.info(`${this.constructor.name} created`);
  }

  start() {
    this.jobs.forEach((job) => {
      job.init();
    });
    logger.info(`start ${this.constructor.name}`);
  }
}
