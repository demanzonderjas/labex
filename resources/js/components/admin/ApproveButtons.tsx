import React from "react";
import { ConfirmButton, DangerButton } from "../base/Button";
import { observer } from "mobx-react-lite";
import { useMatchStore } from "../../hooks/useMatchStore";
import { useTranslationStore } from "../../hooks/useTranslationStore";

type Props = {
	matchId: number;
};

export const ApproveButtons: React.FC<Props> = observer(({ matchId }) => {
	const { approveMatch, rejectMatch } = useMatchStore();
	const { t } = useTranslationStore();

	return (
		<div className="ApproveButtons">
			<h3>{t("approve_match")}</h3>
			<ConfirmButton
				label="yes"
				handleClick={() => approveMatch(matchId)}
				classes={{ inline: true }}
			/>
			<DangerButton
				label="no"
				handleClick={() => rejectMatch(matchId)}
				classes={{ inline: true }}
			/>
		</div>
	);
});
