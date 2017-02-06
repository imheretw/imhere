import Job from './Job';

export default class MyJob extends Job {
  constructor() {
    super();

    this.QUEUE_NAME = 'job: my job';
  }

  async run(job) {
    // you should implement the run method.
    this.logger.debug(`run my job`);
  }

  // addtional required arguments for job handler
  /*
  getPayload() {
    return {
      x: 1,
      y: 2
    };
  }
  */
}
