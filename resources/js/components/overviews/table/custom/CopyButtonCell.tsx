import React from "react";
import { ButtonCell } from "../ButtonCell";
import { useHistory } from "react-router-dom";
import { goToCopyLink } from "../../../../utils/routing/url";
import { TTableCellProps } from "../../../../typings/overviews";

export const CopyButtonCell: React.FC<TTableCellProps> = ({ value, attempt, ...props }) => {
	const history = useHistory();

	return (
		<ButtonCell
			{...props}
			handleClick={() => goToCopyLink(history, attempt)}
			label="copy"
			classes={{ primary: true }}
		/>
	);
};
