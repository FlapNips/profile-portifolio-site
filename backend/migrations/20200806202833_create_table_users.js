
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('user_id')
    table.string('username').notNullable()
    table.string('password').notNullable()
    table.string('full_name').notNullable()
    table.string('profession').notNullable()
    table.string('permission').notNullable().defaultTo('user')
    table.string('avatar').notNullable().defaultTo('profile')
    table.text('about').notNullable() 
  }).then( () => {
    knex.seed.run({ specific: '000_users.js' })
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
