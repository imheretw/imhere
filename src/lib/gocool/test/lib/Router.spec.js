import { expect } from 'chai';
import Router from '../../lib/Router';

describe('Test Router', () => {
  describe('constructor()', () => {
    it('should create a object', async () => {
      const obj = new Router();
      expect(obj).to.be.defined;
      expect(obj._router).to.be.defined;
    });
  });
});
