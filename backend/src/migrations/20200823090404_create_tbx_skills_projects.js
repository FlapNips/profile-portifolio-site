
exports.up = function(knex) {
  return knex.schema.createTable('tbx_skills_projects', table => {
    table.increments('id')
    table.integer('projects_id').unsigned().notNullable()
    table.integer('skills_id').unsigned().notNullable()
    
    table.foreign('projects_id').references('tb_projects.id')
        .onDelete('CASCADE')
        
    table.foreign('skills_id').references('tb_skills.id')
        .onDelete('CASCADE')

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tbx_skills_projects')
};
