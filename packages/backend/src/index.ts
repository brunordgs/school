import 'reflect-metadata';
import express, { Router } from 'express';
import { createConnection } from 'typeorm';
import SessionController from './controllers/SessionController';
import StudentController from './controllers/StudentController';
import UserController from './controllers/UserController';
import cors from 'cors';

const app = express();
const router = Router();

router	
	.post('/users', UserController.store)
	.get('/users', UserController.index);

router.post('/auth', SessionController.authenticate);

router
	.post('/students', StudentController.store)
	.get('/students', StudentController.index)
	.get('/students/:id', StudentController.show)
	.put('/students/:id', StudentController.update)
	.delete('/students/:id', StudentController.destroy);

app.use(cors());
app.use(express.json());
app.use(router);

async function main() {
	await createConnection();

	app.listen(4001, () => console.log('Listening on port 4001'));
}

main().catch((err) => console.error(err));
