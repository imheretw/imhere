require('dotenv').config();

export default {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  auth: process.env.REDIS_PASSWORD,
  db: process.env.REDIS_DB, // if provided select a non-default redis db
  options: {
    // see https://github.com/mranney/node_redis#rediscreateclient
  },
};
