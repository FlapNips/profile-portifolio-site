
exports.up = function(knex) {
	return knex.schema.createTable('experiences_aboutme', table => {
		table.increments('id').primary()
		table.string('title').notNull()
		table.date('date_concluded').notNull()
		table.integer('duration_experience').notNull()
		table.text('content_activity').notNull()
		table.text('content_technologies').notNull()
	}).then( () => {
		return knex('experiences_aboutme').insert([
			{title: 'TITULO TESTE', date_concluded: '2020/07/19', duration_experience: 360, content_activity: "loremloremloremloremloremloremloremloremloremloremloremloremloremlorem", content_technologies: "TECNOLOGIAS"}
		])
	
	})
};

exports.down = function(knex) {
	return knex.schema.dropTable('experiences_aboutme')
};
