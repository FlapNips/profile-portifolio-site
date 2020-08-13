
exports.up = function(knex) {
  return knex.schema.createTable('skills', table => {
    table.increments('skill_id')
    table.string('skill_name').notNullable()
    table.string('skill_path')

  }).then( () => {
    knex.seed.run({ specific: '004_skills.js' })
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('skills')
};
