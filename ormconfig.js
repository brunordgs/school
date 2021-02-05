module.exports = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'challenge',
	synchronize: false,
	logging: false,
	entities: ['src/entity/**/*.ts'],
	migrations: ['src/migration/**/*.ts'],
	cli: {
		'migrationsDir': 'src/migration'
	}
};
