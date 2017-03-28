exports.up = function up(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').unique();
    table.string('encrypted_password');
    table.timestamps();
  });
};

exports.down = function down(knex, Promise) {
  return knex.schema.dropTable('users');
};
