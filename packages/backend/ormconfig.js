module.exports =  {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: 5432,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	synchronize: false,
	logging: false,
	entities: ['src/entity/**/*.ts'],
	migrations: ['src/migration/**/*.ts'],
	cli: {
		'migrationsDir': 'src/migration'
	}
};