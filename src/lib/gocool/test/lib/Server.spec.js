import { expect } from 'chai';
import path from 'path';
import Server from '../../lib/Server';

describe('Test Server', () => {
  describe('constructor()', () => {
    const config = {};

    before(() => {
      // path to root directory of this app
      const rootPath = path.normalize(__dirname);

      config.path = {
        view: path.join(rootPath, 'app/views'),
        static: path.join(rootPath, 'static'),
      };
    });

    it('should create a object', async () => {
      const obj = new Server({
        config,
      });
      expect(obj).to.be.defined;
    });
  });
});
