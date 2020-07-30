
exports.up = function(knex) {
	return knex.schema.createTable('experiences_aboutme', table => {
		table.increments('id').primary()
		table.string('title').notNull()
		table.date('date_concluded').notNull()
		table.integer('duration_experience').notNull()
		table.text('content_activity').notNull()
		table.text('content_technologies').notNull()
	})
};

exports.down = function(knex) {
	return knex.schema.dropTable('experiences_aboutme')
};
