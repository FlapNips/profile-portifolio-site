
//For the test
require('dotenv').config({
	path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const { FsMigrations } = require('knex/lib/migrate/sources/fs-migrations')

module.exports = {

	client: process.env.DB_DIALECT || 'mysql',
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB,
		filename: './src/__tests__/database.sqlite'
	},
  	useNullAsDefault: true,
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		// directory: './src/migrations',
		tableName: 'knex_migrations',
		migrationSource: new FsMigrations('./src/migrations', false)
	},
	seeds: {
		directory: './src/seeds'
	}

};
