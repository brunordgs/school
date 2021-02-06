import React from 'react';
import Header from '../../components/Header';
import List from './list';

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
