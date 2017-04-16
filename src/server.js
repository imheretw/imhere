import dotenv from 'dotenv';
import Server from 'framework/Server';
import JobHandler from 'app/boots/JobHandler';
import PassportHandler from 'app/boots/PassportHandler';

dotenv.config();

const server = new Server();

server.start();

// start background jobs handler
server.addHandlers([
  new JobHandler(),
  new PassportHandler(),
]);

export default server.core;
