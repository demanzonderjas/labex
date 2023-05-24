import React from "react";
import { ButtonCell } from "../ButtonCell";
import { useHistory } from "react-router-dom";
import { goToAdminEditLink, goToEditLink } from "../../../../utils/routing/url";
import { TTableCellProps } from "../../../../typings/overviews";
import { useExchangeAttemptStore } from "../../../../hooks/useExchangeAttemptStore";

export const EditButtonCell: React.FC<TTableCellProps> = ({ value, attempt, ...props }) => {
	const history = useHistory();
	const { adminView } = useExchangeAttemptStore();

	if (attempt.is_match && !adminView) {
		return <td></td>;
	}

	return (
		<ButtonCell
			{...props}
			handleClick={() =>
				adminView ? goToAdminEditLink(history, attempt) : goToEditLink(history, attempt)
			}
			label="edit"
			classes={{ primary: true }}
		/>
	);
};
