import React from "react";
import { observer } from "mobx-react-lite";
import { useMatchStore } from "../../hooks/useMatchStore";
import { Match } from "./Match";
import { useTranslationStore } from "../../hooks/useTranslationStore";

export const PreviousMatchOverview = observer(() => {
	const { previousMatches } = useMatchStore();
	const { t } = useTranslationStore();

	if (!previousMatches.length) {
		return <p className="message">{t("no_matches_in_history")}</p>;
	}

	return (
		<div className="PreviousMatchOverview overview">
			{previousMatches.reverse().map(match => (
				<Match key={match.id} match={match} />
			))}
		</div>
	);
});
