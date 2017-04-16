import dotenv from 'dotenv';
import Server from 'framework/Server';
import JobHandler from 'app/boots/JobHandler';
import PassportHandler from 'app/boots/PassportHandler';
import config from 'config/appConfig';

dotenv.config();

const server = new Server({ config });

server.start();

// start background jobs handler
server.addHandlers([
  new JobHandler(),
  new PassportHandler(),
]);

export default server.core;
