
exports.up = function(knex) {
	return knex.schema.createTable('all_technologies', table => {
		table.increments('id').primary()
		table.string('icon').unique().notNull()
		table.string('img').unique().notNull()
	}).then(() => {
		return knex('all_technologies').insert([
			{icon: 'html5', img: 'assets/icons/html5-icon.svg'},
			{icon: 'css3', img: 'assets/icons/css3-icon.svg'},
			{icon: 'sass', img: 'assets/icons/sass-icon.svg'},
			{icon: 'javascript', img: 'assets/icons/javascript-icon.svg'},
			{icon: 'vuejs', img: 'assets/icons/vuejs-icon.svg'},
			{icon: 'bootstrap', img: 'assets/icons/bootstrap-icon.svg'},
			{icon: 'nodejs', img: 'assets/icons/nodejs-icon.svg'},
			{icon: 'api', img: 'assets/icons/api-icon.svg'},
			{icon: 'json', img: 'assets/icons/json-icon.svg'},
			{icon: 'mysql', img: 'assets/icons/mysql-icon.svg'},
			{icon: 'psql', img: 'assets/icons/postgresql-icon.svg'},
			{icon: 'firebase', img: 'assets/icons/firebase-icon.svg'},
			{icon: 'docker', img: 'assets/icons/docker-icon.svg'},
			{icon: 'empty', img: 'assets/icons/empty-icon.svg'},
		])
	})
};

exports.down = function(knex) {
	return knex.schema.dropTable('all_technologies')
};
