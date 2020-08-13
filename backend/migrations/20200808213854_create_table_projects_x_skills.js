
exports.up = function(knex) {
	return knex.schema.createTable('projects_x_skills', table => {
		table.increments('id')
		table.integer('project_id').unsigned()
		table.integer('skill_id').unsigned()

    table.foreign('project_id').references('users_projects.project_id').onDelete('CASCADE')
    table.foreign('skill_id').references('skills.skill_id').onDelete('CASCADE')
	}).then( () => {
    knex.seed.run({ specific: '006_projects_x_skills.js' })
	})
};

exports.down = function(knex) {
	return knex.schema.dropTable('projects_x_skills')
};
