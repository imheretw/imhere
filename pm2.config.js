require('dotenv').config();

module.exports = {
  apps: [{
    name: process.env.APP_NAME,
    script: './app.js',
    cwd: process.env.APP_PATH,
    error_file: './logs/app.err.log',
    out_file: './logs/app.out.log',
    exec_mode: 'fork_mode',
  }],
};
