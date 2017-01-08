import redis from './redisConfig';

export default {
  prefix: process.env.KUE_PREFIX,
  redis,
};
