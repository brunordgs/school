import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Students1612133677453 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

		await queryRunner.createTable(
			new Table({
				name: 'students',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()'
					},
					{
						name: 'name',
						type: 'varchar',
						isNullable: false
					},
					{
						name: 'user_id',
						type: 'uuid',
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
				foreignKeys: [
					{
						columnNames: ['user_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'users',
					}
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('students');
		await queryRunner.query('DROP EXTENSION "uuid-ossp"');
	}
}
