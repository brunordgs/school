import React from 'react';
import Header from '../Header';
import List from './List';

export default function Dashboard() {
	return (
		<div>
			<Header />
			<div className="max-w-screen-lg m-auto">
				<List />
			</div>
		</div>
	);
}
