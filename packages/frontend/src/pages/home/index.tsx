import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/ui/Input';
import axios from '../../services/api';
import Button from '../../components/ui/Button';

export default function Home() {
	const history = useHistory();
	const [data, setData] = useState([]);
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (localStorage.getItem('user-token')) {
			return history.push('/dashboard');
		}

		getUserData();
	}, []);

	async function handleLogin(e: FormEvent) {
		e.preventDefault();

		await axios
			.post('auth', {
				password
			})
			.then((res) => {
				const { data } = res;

				if (data) {
					localStorage.setItem('user-token', data.token);

					history.push('/dashboard');
				}
			})
			.catch(() => alert('Wrong password, try again'));
	}

	async function getUserData() {
		const { data } = await axios.get('/users');

		return setData(data);
	}

	return (
		<div>
			<div className="grid grid-cols-1 lg:grid-cols-2">
				<div className="bg-gray-300 lg:min-h-screen lg:flex lg:items-center p-8 sm:p-12 shadow-2xl">
					<div className="flex-grow text-center text-2xl">
						<h1 className="font-bold sm:text-5xl mb-2">School</h1>
						<h2 className="sm:text-lg">
							All school's control on your hands (soon)
						</h2>
					</div>
				</div>

				<div className="lg:h-screen lg:flex lg:items-center p12 lg:p-24 xl:p-48">
					<div className="flex-grow bg-gray-50 shadow-xl rounded-md border border-gray-100 p-8">
						<div className="sm:flex sm:items-center">
							<div className="sm:ml-4 sm:text-left text-center">
								<p className="text-xl">Admin</p>
								<p className="text-sm text-gray-600">
									{data.map(({ email }) => email)}
								</p>
							</div>
						</div>

						<form
							onSubmit={handleLogin}
							className="flex w-full mt-8"
						>
							<div className="flex items-center">
								<Input
									type="password"
									placeholder="Password"
									value={password}
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) => setPassword(e.target.value)}
								/>
								<div className="ml-4">
									<Button
										textColor="text-white"
										background="bg-gray-800"
										hoverColor="bg-black"
									>
										Login
									</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
