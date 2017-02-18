'use strict';

import kueConfig from './kueConfig';

export default {
  // environment
  env: process.env.NODE_ENV,

  // port on which to listen
  port: process.env.PORT,

  // authentication
  auth: {
    jwt: process.env.JWT_SECRET,
    bcryptSalt: process.env.BCRYPT_SALT,
  },

  queueConfig: kueConfig,
};
