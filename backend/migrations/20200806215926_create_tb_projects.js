
exports.up = function(knex) {
  return knex.schema.createTable('tb_projects', table => {
    table.increments('id')
    table.integer('users_id').unsigned()
    table.string('title').notNullable()
    table.string('subtitle').notNullable()
    table.text('about').notNullable()
    table.text('list').notNullable()
    table.string('link')
    table.date('date_start').notNullable()
    table.date('date_finish').notNullable()
    
    table.foreign('users_id').references('tb_users.id')
      .onDelete('CASCADE')
      
  }).then( () => {
    knex.seed.run({ specific: '003_tb_projects.js' })
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_projects')
};
