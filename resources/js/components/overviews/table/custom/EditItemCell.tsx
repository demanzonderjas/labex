import React from "react";
import { useHistory } from "react-router-dom";
import { ButtonCell } from "../ButtonCell";

export const EditItemCell = ({ value, rowIndex, item, ...props }) => {
    const history = useHistory();

	return (
		<ButtonCell
			{...props}
			handleClick={() => history.push(`/admin/faq/edit/${item.id}`)}
			label="edit"
			classes={{ confirm: true }}
		/>
	);
};
