
exports.up = function(knex) {
  return knex.schema.alterTable('technology_aboutme', table => {
    table.renameColumn('id', 'icon_id')
    table.foreign('icon_id').references('id').inTable('all_technologies').onDelete('CASCADE')
    table.dropColumn('icon')
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('technology_aboutme', table => {
    table.dropForeign('icon_id')
    table.renameColumn('icon_id', 'id')
    table.string('icon').notNull().default('vazio')
  })
};