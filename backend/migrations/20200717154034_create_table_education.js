
exports.up = function(knex) {
	return knex.schema.createTable('education_aboutme', table => {
		table.increments('id').primary()
		table.string('title').notNull()
		table.date('date_concluded').notNull()
		table.integer('duration_course').notNull()
		table.text('content').notNull()
	})
};

exports.down = function(knex) {
	return knex.schema.dropTable('education_aboutme')
};
