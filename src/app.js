'use strict';

import path from 'path';
import Server from 'imhere';
import config from 'config/appConfig';

export const server = new Server({
  rootPath: path.normalize(__dirname),
  config,
});

server.start();

export default server;
