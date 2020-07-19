// Update with your config settings.

module.exports = {

	client: 'mysql',
	connection: {
		host: '31.170.166.166',
		user:     'u414763690_flapnips',
		password: 'ROALromi@60',
		database: 'u414763690_portfolio'
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}

};
