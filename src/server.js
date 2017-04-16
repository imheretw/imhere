import path from 'path';
import dotenv from 'dotenv';
import Server from 'framework/Server';
import JobHandler from 'app/boots/JobHandler';
import PassportHandler from 'app/boots/PassportHandler';
import config from 'config/appConfig';
import routes from 'app/routes';

dotenv.config();

// path to root directory of this app
const rootPath = path.normalize(__dirname);

config.path = {
  view: path.join(rootPath, 'app/views'),
  static: path.join(rootPath, 'static'),
};

const server = new Server({ config, routes });

server
  .start()
  .addHandlers([
    new JobHandler(),
    new PassportHandler(),
  ]);

export default server.core;
