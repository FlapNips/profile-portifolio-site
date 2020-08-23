
exports.up = function(knex) {
  return knex.schema.createTable('tb_educations', table => {
    table.increments('id')
    table.integer('users_id').unsigned()
    table.string('title').notNullable()
    table.integer('duration').notNullable().defaultTo(0)
    table.text('about').notNullable()
    table.date('date_start').notNullable()
    table.date('date_finish').notNullable()
    
    table.foreign('users_id').references('tb_users.id')
      .onDelete('CASCADE')

  }).then( () => {
    knex.seed.run({ specific: '002_tb_educations.js' })
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_educations')
};
