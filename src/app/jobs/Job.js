import kue from 'kue';

import logger from 'logger';
import kueConfig from '../../config/kueConfig';

export default class Job {
  constructor() {
    // you can customize below attributes of your jobs
    this.QUEUE_NAME = 'default';
    this.CUNCURRENCY = 10;
    this.ATTEMPTS = 3;
    this.PRIORITY = 'medium';
    this.BACKOFF = null;

    this.queue = kue.createQueue(kueConfig);
    logger.debug(`queue '${this.QUEUE_NAME}' is created.`);
  }

  init() {
    this.queue.process(this.QUEUE_NAME, this.CUNCURRENCY, (job, done) => {
      logger.debug(`job ${job.id} in queue ${this.QUEUE_NAME} is processing now.`);
      this.run(job, done);
    });
  }

  register() {
    return new Promise((resolve, reject) => {
      const payload = this.getPayload();
      const data = { title: this.constructor.name, ...payload };
      const job = this.queue.create(this.QUEUE_NAME, data)
        .attempts(this.ATTEMPTS)
        .priority(this.PRIORITY)
        .backoff(this.BACKOFF)
        .save((error) => {
          if (error) {
            reject(error);
          }

          logger.info(`register job ${this.QUEUE_NAME}: ${job.id}`, data);
          resolve(job);
        });
    });
  }

  run(job, done) {
    throw new Error('Should implement run method!');
  }

  getPayload() {
    return {};
  }

  shutdown() {
    logger.info('[ Shutting down Kue... ]');
    this.queue.shutdown(function(err) {
      if (err) {
        logger.error('[ Failed to shut down Kue. ]');
      }

      logger.info('[ Kue is shut down. ]');
    });
  }
}
