
exports.up = function(knex) {
  return knex.schema.createTable('tbx_skills_users', table => {
    table.increments('id')
    table.integer('users_id').unsigned()
    table.integer('skills_id').unsigned()
    table.integer('percent').defaultTo(0)
    
    table.foreign('users_id').references('tb_users.id')
        .onDelete('CASCADE')
        
    table.foreign('skills_id').references('tb_skills.id')
        .onDelete('CASCADE')

  }).then( () => {
    knex.seed.run({ specific: '006_tbx_skills_users.js' })
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tbx_skills_users')
};
