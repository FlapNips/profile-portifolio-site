
exports.up = function(knex) {
  return knex.schema.createTable('tbx_skills_experiences', table => {
    table.increments('id')
    table.integer('experiences_id').unsigned().notNullable()
    table.integer('skills_id').unsigned().notNullable()
    
    table.foreign('experiences_id').references('tb_experiences.id')
        .onDelete('CASCADE')
        
    table.foreign('skills_id').references('tb_skills.id')
        .onDelete('CASCADE')

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tbx_skills_experiences')
};
