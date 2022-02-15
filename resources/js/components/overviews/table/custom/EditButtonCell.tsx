import React from "react";
import { ButtonCell } from "../ButtonCell";
import { useHistory } from "react-router-dom";
import { goToEditLink } from "../../../../utils/routing/url";
import { TTableCellProps } from "../../../../typings/overviews";

export const EditButtonCell: React.FC<TTableCellProps> = ({ value, attempt, ...props }) => {
	const history = useHistory();

	return (
		<ButtonCell
			{...props}
			handleClick={() => goToEditLink(history, attempt)}
			label="edit"
			classes={{ primary: true }}
		/>
	);
};
