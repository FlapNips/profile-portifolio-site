
exports.up = function(knex) {
	return knex.schema.createTable('technology_aboutme', table => {
		table.increments('id').primary()
		table.string('icon').notNull().unique()
		table.integer('percent').notNull().default(0)
	})
};

exports.down = function(knex) {
	return knex.schema.dropTable('technology_aboutme')
};
