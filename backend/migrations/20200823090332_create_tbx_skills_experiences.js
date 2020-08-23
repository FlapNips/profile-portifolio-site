
exports.up = function(knex) {
  return knex.schema.createTable('tbx_skills_experiences', table => {
    table.increments('id')
    table.integer('experiences_id').unsigned()
    table.integer('skills_id').unsigned()
    
    table.foreign('experiences_id').references('tb_experiences.id')
        .onDelete('CASCADE')
        
    table.foreign('skills_id').references('tb_skills.id')
        .onDelete('CASCADE')

  }).then( () => {
    knex.seed.run({ specific: '007_tbx_skills_experiences.js' })
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tbx_skills_experiences')
};
