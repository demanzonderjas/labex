import React from "react";
import { ButtonCell } from "../ButtonCell";
import { useNavigate } from "react-router-dom";
import { goToAdminEditLink, goToEditLink } from "../../../../utils/routing/url";
import { TTableCellProps } from "../../../../typings/overviews";
import { useExchangeAttemptStore } from "../../../../hooks/useExchangeAttemptStore";
import { approveAttempt } from "../../../../queries/admin/approveAttempt";
import { BooleanCell } from "../BooleanCell";
import { TExchangeAttemptStatus } from "../../../../typings/exchanges";

export const ActivateCell: React.FC<TTableCellProps> = ({ value, attempt, ...props }) => {
	const { setAttempts, attempts } = useExchangeAttemptStore();
	if (attempt.status !== "on-hold") {
		return <BooleanCell value={attempt.status} />;
	}

	const activate = async () => {
		const response = await approveAttempt(attempt.id);
		if (response.success) {
			const copy = [...attempts];
			const attemptIndex = copy.findIndex((_attempt) => _attempt.id === attempt.id);
			copy[attemptIndex] = { ...attempt, status: TExchangeAttemptStatus.Active };
			setAttempts(copy);
		}
	};

	return (
		<ButtonCell
			{...props}
			handleClick={activate}
			label="activate"
			classes={{ secondary: true }}
		/>
	);
};
