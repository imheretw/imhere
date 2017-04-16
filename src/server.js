import dotenv from 'dotenv';
import Server from 'framework/Server';

dotenv.config();

const server = new Server();

server.start();

export default server.core;
