
exports.up = function(knex) {
  return knex.schema.createTable('users_contact', table => {
    table.integer('user_id').unsigned()
    table.string('address').notNullable()
    table.string('phone').notNullable()
    table.string('email').notNullable().defaultTo('user')
    table.string('github')
    table.string('linkedin')
    table.string('facebook')
    
    table.foreign('user_id').references('user_id').inTable('users')
        .onDelete('CASCADE')
  }).then( () => {
    knex.seed.run({ specific: '001_users_contact.js' })
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_contact')
};
