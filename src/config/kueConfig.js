import redis from './redisConfig';

require('dotenv').config();

export default {
  prefix: process.env.KUE_PREFIX,
  redis,
};
