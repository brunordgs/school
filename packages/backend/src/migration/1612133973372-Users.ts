import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1612133973372 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()'
					},
					{
						name: 'email',
						type: 'varchar',
						length: '255',
						isUnique: true,
						isNullable: false
					},
					{
						name: 'password',
						type: 'varchar',
						isNullable: false
					},
					{
						name: 'created_at',
						type: 'timestamptz',
						isNullable: false,
						default: 'now()'
					},
					{
						name: 'updated_at',
						type: 'timestamptz',
						isNullable: false,
						default: 'now()'
					}
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
		await queryRunner.query('DROP EXTENSION "uuid-ossp"');
	}
}
