import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function Header() {
	const history = useHistory();

	function handleLogout() {
		localStorage.removeItem('user-token');

		return history.push('/');
	}

	return (
		<div>
			<div className="bg-gray-800 shadow-lg text-white absolute top-0 left-0 w-screen p-11">
				<div className="flex items-end">
					<Link to="/dashboard" className="text-2xl font-bold">
						Dashboard
					</Link>
					<Link to="/register" className="ml-12 mr-4">
						New student
					</Link>
					<div className="flex flex-grow items-end justify-end">
						<span>Hello, admin</span>
						<button onClick={handleLogout} className="text-red-200 mx-5 hover:text-red-400 transition-colors font-bold">
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
