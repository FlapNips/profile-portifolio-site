
exports.up = function(knex) {
  return knex.schema.createTable('tb_skills', table => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('image')

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_skills')
};
