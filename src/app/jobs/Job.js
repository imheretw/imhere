import kue from 'kue';
import moment from 'moment';

import Logable from 'Logable';
import kueConfig from '../../config/kueConfig';

export default class Job extends Logable {
  constructor() {
    super();

    // you can customize below attributes of your jobs
    this.CUNCURRENCY = 10;
    this.ATTEMPTS = 3;
    this.PRIORITY = 'medium';
    this.BACKOFF = null;

    this.queue = kue.createQueue(kueConfig);
  }

  run(job, done) {
    throw new Error('Should implement run method!');
  }

  runImmediate() {
    const jobInstance = this._prepareJobData();
    this.run(jobInstance);
  }

  runLater(delay) {
    return this._addJobToQueue(delay);
  }

  runUntil(until) {
    const delay = moment(until).diff(new Date());
    return this.runLater(delay);
  }

  getPayload() {
    return {};
  }

  shutdown() {
    this.logger.info('[ Shutting down Kue... ]');
    this.queue.shutdown((err) => {
      if (err) {
        this.logger.error('[ Failed to shut down Kue. ]');
      }

      this.logger.info('[ Kue is shut down. ]');
    });
  }

  _prepareJobData() {
    const payload = this.getPayload();
    const data = { title: this.constructor.name, ...payload };

    return { data };
  }

  _addJobToQueue(delay = 0) {
    return new Promise((resolve, reject) => {
      const { data } = this._prepareJobData();
      const job = this.queue.create(this.constructor.name, data)
        .attempts(this.ATTEMPTS)
        .delay(delay)
        .priority(this.PRIORITY)
        .backoff(this.BACKOFF)
        .save((error) => {
          if (error) {
            reject(error);
          }

          this.logger.info(`dispatch ${this.constructor.name}: ${job.id} with delay: ${delay}`, data);
          resolve(job);
        });
    });
  }
}
