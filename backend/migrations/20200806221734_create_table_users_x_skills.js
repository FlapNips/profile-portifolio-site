
exports.up = function(knex) {
  return knex.schema.createTable('users_x_skills', table => {
    table.increments('id')
    table.integer('user_id').unsigned()
    table.integer('skill_id').unsigned()
    table.integer('skill_percent').defaultTo(0)
    
    table.foreign('user_id').references('user_id').inTable('users')
        .onDelete('CASCADE')
    table.foreign('skill_id').references('skill_id').inTable('skills')
        .onDelete('CASCADE')
  }).then( () => {
    knex.seed.run({ specific: '005_users_x_skills.js' })
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_x_skills')
};
