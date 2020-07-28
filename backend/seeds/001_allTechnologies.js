
exports.seed = async function(knex) {
  //Remove foreign
  await knex.schema.alterTable('technology_aboutme', table => {
    table.dropForeign('icon_id')
  })
  // Deletes ALL existing entries
  await knex('all_technologies').del()
      // Inserts seed entries
  await knex('all_technologies').insert([
			{ id: 1, icon: 'html5', img: 'assets/icons/html5-icon.svg' },
			{ id: 2, icon: 'css3', img: 'assets/icons/css3-icon.svg' },
			{ id: 3, icon: 'sass', img: 'assets/icons/sass-icon.svg' },
			{ id: 4, icon: 'javascript', img: 'assets/icons/javascript-icon.svg' },
			{ id: 5, icon: 'vuejs', img: 'assets/icons/vuejs-icon.svg' },
			{ id: 6, icon: 'bootstrap', img: 'assets/icons/bootstrap-icon.svg' },
			{ id: 7, icon: 'nodejs', img: 'assets/icons/nodejs-icon.svg' },
			{ id: 8, icon: 'api', img: 'assets/icons/api-icon.svg' },
			{ id: 9, icon: 'json', img: 'assets/icons/json-icon.svg' },
			{ id: 10, icon: 'mysql', img: 'assets/icons/mysql-icon.svg' },
			{ id: 11, icon: 'psql', img: 'assets/icons/postgresql-icon.svg' },
			{ id: 12, icon: 'firebase', img: 'assets/icons/firebase-icon.svg' },
			{ id: 13, icon: 'docker', img: 'assets/icons/docker-icon.svg' },
      ]);
  //Add foreign
  await knex.schema.alterTable('technology_aboutme', table => {
    table.foreign('icon_id').references('id').inTable('all_technologies')
  })
};
