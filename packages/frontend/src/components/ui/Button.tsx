import React from 'react';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	background?: string;
	textColor: string;
	hoverColor?: string;
	margin?: string;
}

export default function Button({
	children,
	background,
	textColor,
	hoverColor,
	margin,
	...rest
}: Props) {
	return (
		<div>
			<button
				{...rest}
				className={`${background} ${textColor} ${hoverColor} ${margin} flex-shrink-0 py-2 px-4 rounded-md transition-colors`}
			>
				{children}
			</button>
		</div>
	);
}
