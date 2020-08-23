
exports.up = function(knex) {
  return knex.schema.createTable('tb_contact', table => {
    table.integer('users_id').unsigned()
    table.string('address').notNullable()
    table.string('phone').notNullable()
    table.string('email').notNullable().defaultTo('email@gmail.com')
    table.string('github')
    table.string('linkedin')
    table.string('facebook')
    table.datetime('update_time', { precision: 4 }).defaultTo(knex.fn.now(4))
    
    table.foreign('users_id').references('tb_users.id')
      .onDelete('CASCADE')
      
  }).then( () => {
    knex.seed.run({ specific: '001_tb_contacts.js' })
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_contact')
};
