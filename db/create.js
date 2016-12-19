require('babel-register');
require('dotenv').config();

var dbConfig = require('../knexfile');
var environment = process.env.NODE_ENV || 'development';
var config = dbConfig[environment];

var database = config.connection.database;
config.connection.database = null;

var knex = require('knex')(config);
// connect without database selected

knex.raw(`CREATE DATABASE ${database}`)
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
