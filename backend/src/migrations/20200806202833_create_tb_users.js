
exports.up = function(knex) {
  return knex.schema.createTable('tb_users', table => {
    table.increments('id')
    table.string('username').notNullable()
    table.string('password').notNullable()
    table.string('full_name').notNullable()
    table.string('profession').notNullable()
    table.text('about').notNullable() 
    table.string('permission').notNullable().defaultTo('user')
    table.string('avatar').notNullable().defaultTo('profile')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_users')
};
