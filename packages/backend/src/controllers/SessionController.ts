import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class SessionController {
	async authenticate(req: Request, res: Response) {
		try {
			const repository = getRepository(User);
			const { email, password } = req.body;

			const user = await repository.findOne({ where: email });

			if (!user) {
				return res.status(404).json({
					message: 'User not found'
				});
			}

			const isValidPassword = await bcrypt.compare(password, user.password);

			if (!isValidPassword) {
				return res.status(401).json({
					message: 'Wrong password'
				});
			}

			const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

			delete user.password;

			return res.json({
				user,
				token
			});
		} catch (e) {
			return res.status(500).json({
				message: 'Invalid login',
				error: e
			});
		}
	}
}

export default new SessionController();
