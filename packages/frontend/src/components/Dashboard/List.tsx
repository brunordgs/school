import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import axios from '../../utils/connection';
import formatDate from '../../utils/formatDate';
import { Link } from 'react-router-dom';

type Students = {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
};

export default function List() {
	const [students, setStudents] = useState<Students[]>([]);

	useEffect(() => {
		loadStudents();
	}, []);

	async function loadStudents() {
		const { data } = await axios.get('/students');

		return setStudents(data);
	}

	async function handleRemove(id: string) {
		await axios.delete(`/students/${id}`);
		loadStudents();
	}

	return (
		<div>
			<div className="flex items-center justify-center">
				<div className="flex flex-col items-center bg-white h-full w-screen max-w-6xl rouded-md p-11 shadow-lg">
					{students.length > 0 ? (
						<div>
							<div className="flex items-center justify-between mb-8">
								<p className="font-bold text-2xl">
									Students list
								</p>

								<p>Ordered by name</p>
							</div>
							<table>
								<thead className="bg-gray-200">
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>Updated</th>
										<th>Created</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{students.map((student) => (
										<tr key={student.id}>
											<td className="w-36 py-2">
												{student.id}
											</td>
											<td className="px-4 py-2">
												{student.name}
											</td>
											<td className="px-4 py-2">
												{formatDate(student.updatedAt)}
											</td>
											<td className="px-4 py-2">
												{formatDate(student.createdAt)}
											</td>
											<td className="px-4 py-2">
												<div className="flex">
													<Link
														to={`/register/${student.id}`}
														className="bg-blue-400 text-white hover:bg-blue-500 flex-shrink-0 py-2 px-4 rounded-md transition-colors mx-4"
													>
														Edit
													</Link>
													<Button
														onClick={() =>
															handleRemove(
																student.id
															)
														}
														background="bg-red-400"
														textColor="text-white"
														hoverColor="hover:bg-red-500"
													>
														Delete
													</Button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<p>No students found :(</p>
					)}
				</div>
			</div>
		</div>
	);
}
