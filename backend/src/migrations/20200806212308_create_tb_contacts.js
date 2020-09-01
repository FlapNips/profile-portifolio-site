
exports.up = function(knex) {
  return knex.schema.createTable('tb_contacts', table => {
    table.integer('users_id').unsigned().primary()
    table.string('address').notNullable()
    table.string('phone').notNullable()
    table.string('email').notNullable().defaultTo('email@gmail.com')
    table.string('github')
    table.string('linkedin')
    table.string('facebook')
    table.datetime('update_time').defaultTo(knex.fn.now())
    
    table.foreign('users_id').references('tb_users.id')
      .onDelete('CASCADE')
      
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_contacts')
};
