
exports.up = function(knex) {
	return knex.schema.createTable('experiences_x_skills', table => {
		table.increments('id')
		table.integer('experience_id').unsigned()
		table.integer('skill_id').unsigned()

    table.foreign('experience_id').references('users_experiences.experience_id').onDelete('CASCADE')
    table.foreign('skill_id').references('skills.skill_id').onDelete('CASCADE')
	}).then( () => {
    knex.seed.run({ specific: '008_experiences_x_skills.js' })
	})
};

exports.down = function(knex) {
	return knex.schema.dropTable('experiences_x_skills')
};
