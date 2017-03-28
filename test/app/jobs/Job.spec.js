import { expect } from 'chai';
import sinon from 'sinon';

import Job from 'jobs/Job';

describe('Test Job', () => {
  let sandbox;
  let job;

  before(() => {
    sandbox = sinon.sandbox.create();
    job = new Job();
    job.queue.testMode.enter();
  });

  afterEach(() => {
    job.queue.testMode.clear();
    sandbox.restore();
  });

  describe('constructor', () => {
    it('should create a queue', async () => {
      expect(job).to.have.property('CUNCURRENCY');
      expect(job).to.have.property('ATTEMPTS');
      expect(job).to.have.property('PRIORITY');
      expect(job).to.have.property('BACKOFF');
      expect(job).to.have.property('queue');
    });
  });

  describe('when calling _addJobToQueue', () => {
    it('should call queue.create', async () => {
      const stub = sandbox.stub(job.queue, 'create').returns({
        save: () => {},
      });
      job._addJobToQueue();

      expect(stub.calledWith(job.constructor.name)).be.true;
    });
  });

  describe('when calling run', () => {
    it('should throw error', async () => {
      expect(job.run).be.throw(Error);
    });
  });

  describe('when calling runImmediate', () => {
    it('should call run', async () => {
      const stub = sandbox.stub(job, 'run');
      job.runImmediate();

      expect(stub.calledOnce).be.true;
    });
  });

  describe('when calling runLater', () => {
    it('should call _addJobToQueue with delay', async () => {
      const stub = sandbox.stub(job, '_addJobToQueue');
      const delay = 1000;
      job.runLater(delay);

      expect(stub.calledWith(delay)).be.true;
    });
  });

  describe('when calling runUntil', () => {
    it('should call runLater', async () => {
      const stub = sandbox.stub(job, 'runLater');
      job.runUntil();

      expect(stub.calledOnce).be.true;
    });
  });

  describe('when calling shutdown', () => {
    it('should call queue.shutdown', async () => {
      const stub = sandbox.stub(job.queue, 'shutdown');
      job.shutdown();

      expect(stub.calledOnce).be.true;
    });
  });
});
