import React from "react";
import { deleteAlert } from "../../../../queries/alerts";
import { ButtonCell } from "../ButtonCell";

export const DeleteAlertCell = ({ value, rowIndex, alert, ...props }) => {
	const deleteMe = async () => {
		await deleteAlert(alert.id);
		location.reload();
	};

	return (
		<ButtonCell
			{...props}
			handleClick={deleteMe}
			label="delete"
			classes={{ danger: true, small: true }}
		/>
	);
};
