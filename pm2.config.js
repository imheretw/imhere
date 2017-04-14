require('dotenv').config();

module.exports = {
  apps: [{
    name: process.env.APP_NAME,
    script: './server.js',
    cwd: process.env.APP_PATH,
    error_file: './logs/server.err.log',
    out_file: './logs/server.out.log',
    exec_mode: 'fork_mode',
  }],
};
