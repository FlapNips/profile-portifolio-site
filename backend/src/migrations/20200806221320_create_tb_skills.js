
exports.up = function(knex) {
  return knex.schema.createTable('tb_skills', table => {
    table.increments('id')
    table.integer('users_id').unsigned().notNullable()
    table.string('fileName').notNullable()
    table.string('title').notNullable()
    table.integer('percent').defaultTo(0)
    
    table.foreign('users_id').references('tb_users.id')
        .onDelete('CASCADE')
        
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_skills')
};
