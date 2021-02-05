import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BeforeInsert,
	OneToMany,
	JoinColumn
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { Student } from './Student';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column({ name: 'created_at' })
	createdAt: Date;

	@Column({ name: 'updated_at' })
	updatedAt: Date;

	@BeforeInsert()
	hashPassword() {
		this.password = bcrypt.hashSync(this.password, 10);
	}

	@OneToMany(() => Student, (student) => student.user)
	@JoinColumn({ name: 'user_id' })
	students: Student[];
}
