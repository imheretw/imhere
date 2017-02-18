import { Job } from 'imhere';

export default class MyJob extends Job {
  async run(job) {
    // you should implement the run method.
    this._log();
  }

  _log() {
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
