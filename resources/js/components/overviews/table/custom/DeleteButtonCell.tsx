import React from "react";
import { ButtonCell } from "../ButtonCell";

export const DeleteButtonCell = ({ value, rowIndex, sample, ...props }) => {
	const sampleType = !!sample.date_available ? "offer" : "request";

	const deleteSample = () => {
		console.log("deleting sample", sample);
	};

	return (
		<ButtonCell
			{...props}
			handleClick={deleteSample}
			label="delete"
			classes={{ danger: true }}
		/>
	);
};
