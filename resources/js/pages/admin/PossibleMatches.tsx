import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../../hooks/useTranslationStore";

export const PossibleMatches = observer(() => {
	const { t } = useTranslationStore();
	return (
		<div className="PossibleMatchesPage">
			<h1>{t("possible_matches")}</h1>
		</div>
	);
});
