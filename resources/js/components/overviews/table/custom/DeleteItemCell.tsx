import React from "react";
import { deleteFaqItem } from "../../../../queries/admin/deleteFaqItem";
import { ButtonCell } from "../ButtonCell";

export const DeleteItemCell = ({ value, rowIndex, item, ...props }) => {
	const deleteItem = async () => {
        await deleteFaqItem(item.id);
        location.reload();
	};

	return (
		<ButtonCell
			{...props}
			handleClick={deleteItem}
			label="delete"
			classes={{ danger: true }}
		/>
	);
};
