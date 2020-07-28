
exports.up = function(knex) {
	return knex.schema.createTable('all_technologies', table => {
		table.increments('id').primary()
		table.string('icon').unique().notNull()
		table.string('img').unique().notNull()
	})
};

exports.down = function(knex) {
	return knex.schema.dropTable('all_technologies')
};
