'use strict';

import path from 'path';
import Server from 'imhere';

export const server = new Server({
  rootPath: path.normalize(__dirname),
});

server.start();

export default server;
