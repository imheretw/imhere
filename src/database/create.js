/* eslint-disable no-console */

require('babel-register');
require('dotenv').config();

const dbConfig = require('../config/knexConfig');

const environment = process.env.NODE_ENV || 'development';
const config = dbConfig[environment];

const database = config.connection.database;
config.connection.database = null;

const knex = require('knex')(config);
// connect without database selected

knex.raw(`CREATE DATABASE ${database}`)
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
