
exports.up = function(knex) {
  return knex.schema.createTable('tb_skills', table => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('image')

  }).then( () => {
    knex.seed.run({ specific: '005_tb_skills.js' })
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_skills')
};
