
exports.up = function(knex) {
  return knex.schema.createTable('aboutme', table => {
    table.string('address').notNull()
    table.string('phone').notNull()
    table.string('email').notNull()
    table.string('link_github')
    table.string('link_linkedin')
    table.string('link_facebook')
  
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('aboutme')
};
