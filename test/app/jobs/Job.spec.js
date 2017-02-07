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
    it('should create a queue', async() => {
      expect(job).to.have.property('QUEUE_NAME');
      expect(job).to.have.property('CUNCURRENCY');
      expect(job).to.have.property('ATTEMPTS');
      expect(job).to.have.property('PRIORITY');
      expect(job).to.have.property('BACKOFF');
      expect(job).to.have.property('queue');
    });
  });

  describe('when calling init', () => {
    it('should call queue.process', async() => {
      const spy = sandbox.spy(job.queue, 'process');
      job.init();

      expect(spy.calledOnce).be.true;
    });
  });

  describe('when calling register', () => {
    it('should call queue.create', async() => {
      const stub = sandbox.stub(job.queue, 'create').returns({
        save: () => {},
      });
      job.register();

      expect(stub.calledOnce).be.true;
    });
  });

  describe('when calling run', () => {
    it('should throw error', async() => {
      expect(job.run).be.throw(Error);
    });
  });

  describe('when calling shutdown', () => {
    it('should call queue.shutdown', async() => {
      const stub = sandbox.stub(job.queue, 'shutdown');
      job.shutdown();

      expect(stub.calledOnce).be.true;
    });
  });
});
