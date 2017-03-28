import kue from 'kue';
import Logable from 'Logable';
import Jobs from 'jobs/index';
import kueConfig from 'config/kueConfig';

export default class JobHandler extends Logable {
  constructor() {
    super();

    this.jobs = Jobs.map(Job => new Job());
    this.queue = kue.createQueue(kueConfig);

    this.logger.info(`${this.constructor.name} created`);
  }

  start() {
    this.jobs.forEach((job) => {
      this.queue.process(job.JOB_NAME, job.CUNCURRENCY, async (jobInstance, done) => {
        try {
          this.logger.debug(`job ${jobInstance.id} in queue ${job.JOB_NAME} is processing now.`);

          await job.run(jobInstance);
          done();
        } catch (error) {
          this.logger.error(`Error when runing job of ${job.constructor.name}:`, error);
          done(error);
        }
      });

      this.logger.debug(`${job.constructor.name} registered.`);
    });

    this.logger.info(`start ${this.constructor.name}`);
  }
}
