import React from "react";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { observer } from "mobx-react-lite";

export const TotalMatchesFound: React.FC = observer(() => {
	const { totalMatches } = useExchangeAttemptStore() || {};
	const { t } = useTranslationStore();

	if (totalMatches == 0) {
		return null;
	}

	const refElem = document.querySelector(".overview h1");

	return (
		<div
			className="TotalMatchesFound"
			onClick={refElem ? () => refElem.scrollIntoView({ behavior: "smooth" }) : undefined}
		>
			{totalMatches} {t("matches_were_found")}
		</div>
	);
});
