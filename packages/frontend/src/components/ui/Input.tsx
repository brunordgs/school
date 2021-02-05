import React from 'react';

export default function Input({ ...rest }) {
	return (
		<>
			<input
				{...rest}
				className="flex-1 w-full text-gray-700 rounded-md border focus:bg-gray-50 transition-colors outline-none focus:placeholder-gray-200 py-2 px-4"
			/>
		</>
	);
}
