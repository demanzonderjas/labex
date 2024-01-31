import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonCell } from "../ButtonCell";

export const EditItemCell = ({ value, rowIndex, item, ...props }) => {
	const navigate = useNavigate();

	return (
		<ButtonCell
			{...props}
			handleClick={() => navigate(`/admin/faq/edit/${item.id}`)}
			label="edit"
			classes={{ confirm: true }}
		/>
	);
};
