import React from "react";
import { ButtonCell } from "../ButtonCell";
import { useNavigate } from "react-router-dom";
import { goToCopyLink } from "../../../../utils/routing/url";
import { TTableCellProps } from "../../../../typings/overviews";

export const CopyButtonCell: React.FC<TTableCellProps> = ({ value, attempt, ...props }) => {
	const navigate = useNavigate();

	return (
		<ButtonCell
			{...props}
			handleClick={() => goToCopyLink(navigate, attempt)}
			label="copy"
			classes={{ primary: true }}
		/>
	);
};
