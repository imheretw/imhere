const knexCleaner = require('knex-cleaner');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  var options = {
    mode: 'truncate', // Valid options 'truncate', 'delete'
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  };

  return knexCleaner.clean(knex, options);
};
