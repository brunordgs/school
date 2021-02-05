import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Student } from '../entity/Student';

class StudentController {
	async store(req: Request, res: Response) {
		try {
			const repository = getRepository(Student);
			const student = await repository.save({
				...req.body
			});

			return res.status(200).json(student);
		} catch (e) {
			return res.status(400).json({
				message: 'Error when creating student',
				error: e
			});
		}
	}

	async index(req: Request, res: Response) {
		try {
			const students = await getRepository(Student).find({
				order: {
					name: 'ASC'
				}
			});

			return res.status(200).json(students);
		} catch (e) {
			return res.status(400).json({
				message: 'Error when listing students',
				error: e
			});
		}
	}

	async show(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const student = await getRepository(Student).findOne(id);

			return res.status(200).json(student);
		} catch (e) {
			return res.status(404).json({
				message: 'Student does not exist',
				error: e
			});
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const student = await getRepository(Student).update(id, req.body);

			if (student.affected === 1) {
				const updatedStudent = await getRepository(Student).findOne(id);

				return res.status(200).json(updatedStudent);
			}
		} catch (e) {
			return res.status(400).json({
				messsage: 'Cannot update student',
				error: e
			});
		}
	}

	async destroy(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const student = await getRepository(Student).delete(id);

			return res.status(200).json(student);
		} catch (e) {
			return res.status(400).json({
				messsage: 'Cannot remove student',
				error: e
			});
		}
	}
}

export default new StudentController();
