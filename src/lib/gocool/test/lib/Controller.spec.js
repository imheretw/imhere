import { expect } from 'chai';
import Controller from '../../lib/Controller';

describe('Test Controller', () => {
  describe('static action()', () => {
    it('should return a object', async () => {
      const obj = Controller.action('test');
      expect(obj).to.be.defined;
    });
  });
});
