import React from "react";
import { ButtonCell } from "../ButtonCell";
import { useNavigate } from "react-router-dom";
import { goToAdminEditLink, goToEditLink } from "../../../../utils/routing/url";
import { TTableCellProps } from "../../../../typings/overviews";
import { useExchangeAttemptStore } from "../../../../hooks/useExchangeAttemptStore";

export const EditButtonCell: React.FC<TTableCellProps> = ({ value, attempt, ...props }) => {
	const navigate = useNavigate();
	const { adminView } = useExchangeAttemptStore();

	if (attempt.is_match && !adminView) {
		return <td></td>;
	}

	return (
		<ButtonCell
			{...props}
			handleClick={() =>
				adminView ? goToAdminEditLink(navigate, attempt) : goToEditLink(navigate, attempt)
			}
			label="edit"
			classes={{ primary: true }}
		/>
	);
};
