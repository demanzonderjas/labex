import React from "react";
import { observer } from "mobx-react-lite";
import { useMatchStore } from "../../hooks/useMatchStore";
import { Match } from "./Match";
import { useTranslationStore } from "../../hooks/useTranslationStore";

export const ApproveMatchOverview = observer(() => {
	const { possibleMatches } = useMatchStore();
	const { t } = useTranslationStore();

	if (!possibleMatches.length) {
		return <div className="ApproveMatchOverview message">{t("no_matches_to_judge")}</div>;
	}

	return (
		<div className="ApproveMatchOverview overview">
			{possibleMatches.map(match => (
				<Match key={match.id} match={match} />
			))}
		</div>
	);
});
