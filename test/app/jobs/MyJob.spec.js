import { expect } from 'chai';
import sinon from 'sinon';

import MyJob from 'jobs/MyJob';

describe('Test MyJob', () => {
  let sandbox;
  let myJob;

  const dummy = () => {};

  beforeEach(async () => {
    sandbox = sinon.sandbox.create();
    myJob = new MyJob();
    myJob.queue.testMode.enter();
  });

  afterEach(() => {
    myJob.queue.testMode.clear();
    sandbox.restore();
  });

  describe('constructor', () => {
    it('should create a queue', async () => {
      expect(myJob.queue).be.not.undefined;
    });
  });

  describe('when calling run', () => {
    it('should call _log', async () => {
      const stub = sandbox.stub(myJob, '_log')
        .returns({
          then: dummy,
        });
      myJob.run();

      expect(stub.calledOnce).be.true;
    });
  });

  describe('when calling _log', () => {
    it('should calling logger.debug', async () => {
      const stub = sandbox.stub(myJob.logger, 'debug')
        .returns({
          then: dummy,
        });

      myJob._log(dummy);

      expect(stub.calledOnce).be.true;
    });
  });
});
