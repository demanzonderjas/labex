import React from "react";

type Props = {
	value: string;
};

export const DisplayedDate: React.FC<Props> = ({ value }) => {
	const [year, month, day] = value.split("-");
	return (
		<div className="DisplayedDate inline">
			<span>{day}</span>
			<span>{month}</span>
			<span>{year}</span>
		</div>
	);
};
