
exports.up = function(knex) {
  return knex.schema.createTable('users_projects', table => {
    table.increments('project_id')
    table.integer('user_id').unsigned()
    table.string('project_title').notNullable()
    table.date('project_date_start').notNullable()
    table.date('project_date_finish').notNullable()
    table.text('project_about').notNullable()
    table.text('project_list_about').notNullable()
    
    table.foreign('user_id').references('user_id').inTable('users')
        .onDelete('CASCADE')
  }).then( () => {
    knex.seed.run({ specific: '003_users_projects.js' })
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_projects')
};
