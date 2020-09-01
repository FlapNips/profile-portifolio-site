require('dotenv').config({
	path: process.env.NODE_ENV === 'test' ? `.env.test` : '.env'
})
const { FsMigrations } = require('knex/lib/migrate/sources/fs-migrations')

module.exports = {
	development: {
		client: process.env.DB_DIALECT,
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB
		},
		useNullAsDefault: false,
		pool: {
			min: 0,
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
	},

	test: {
		client: process.env.DB_DIALECT || 'sqlite3',
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB,
			filename: './src/__tests__/database.sqlite'
		},
		useNullAsDefault: false,
		pool: {
			min: 0,
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
	}

};
