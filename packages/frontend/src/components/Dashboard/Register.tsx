import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import axios from '../../utils/connection';
import Header from '../Header';

export default function Register() {
	const history = useHistory();
	const { id } = useParams();
	const [student, setStudent] = useState<any>('');

	useEffect(() => {
		if (id) {
			findStudent(id);
		}
	}, [id]);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		const { data } = await axios.get('/users');
		const user = data.map(({ id }: any) => id)[0];

		if (!student) {
			return alert('You need to fill out name field');
		}

		if (id) {
			if (!student.name) {
				await axios.put(`/students/${id}`, {
					user,
					name: student
				});
			}

			return history.push('/dashboard');
		}

		const response = await axios.post('/students', {
			user,
			name: student
		});

		if (response) {
			history.push('/dashboard');
		} else {
			alert('Sorry but the student was not created, try again later');
			throw new Error('Something went wrong at creating student');
		}
	}

	async function findStudent(id: string) {
		const { data } = await axios.get(`/students/${id}`);

		setStudent({
			name: data.name
		});
	}

	return (
		<div>
			<Header />
			<div className="bg-white w-auto h-auto rouded-md p-11 shadow-lg">
			<form onSubmit={handleSubmit} className="flex">
				<Button
					background="bg-gray-800"
					textColor="text-white"
					hoverColor="hover:bg-gray-700"
				>
					Add
				</Button>
				<div className="flex-grow mx-6">
					<Input
						type="text"
						placeholder="Student name"
						value={student.name}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setStudent(e.target.value)
						}
					/>
				</div>
			</form>
			</div>
			</div>
	);
}
