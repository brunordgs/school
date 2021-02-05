import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

class UserController {
	async store(req: Request, res: Response) {
		try {
			const repository = getRepository(User);
			const { email, password } = req.body;
			const userExists = await repository.findOne({ where: { email } });

			if (userExists) {
				return res.status(409).json({
					message: 'User already exists'
				});
			}

			const user = repository.create({
				email,
				password
			});

			await repository.save(user);

			return res.status(200).json(user);
		} catch (e) {
			return res.status(400).json({
				message: 'Error when creating user',
				error: e
			});
		}
	}

	async index(req: Request, res: Response) {
		try {
			const users = await getRepository(User).find();

			if (users.length === 0) {
				return res.status(404).json({
					message: 'No user found'
				});
			}

			const user = users.map((user) => user);

			delete user[0].password;

			return res.status(200).json(users);
		} catch (e) {
			return res.status(400).json({
				message: 'Error when listing users',
				error: e
			});
		}
	}
}

export default new UserController();
