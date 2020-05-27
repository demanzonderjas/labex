import React from "react";
import { ConfirmButton, DangerButton } from "../base/Button";
import { observer } from "mobx-react-lite";
import { useMatchStore } from "../../hooks/useMatchStore";

type Props = {
	matchId: number;
};

export const ApproveButtons: React.FC<Props> = observer(({ matchId }) => {
	const { approveMatch, rejectMatch } = useMatchStore();

	return (
		<div className="ApproveButtons">
			<ConfirmButton label="yes" handleClick={() => approveMatch(matchId)} />
			<DangerButton label="no" handleClick={() => rejectMatch(matchId)} />
		</div>
	);
});
