
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('username').notNull().unique()
    table.string('password').notNull()
    table.string('permission').notNull().default('user')
  })
};

exports.down = function(knex) {
  return knex.dropTable('users')
};
