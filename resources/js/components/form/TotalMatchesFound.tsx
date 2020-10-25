import React from "react";
import { useSampleStore } from "../../hooks/useSampleStore";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { observer } from "mobx-react-lite";

export const TotalMatchesFound: React.FC = observer(() => {
	const { totalMatches } = useSampleStore();
	const { t } = useTranslationStore();

	if (totalMatches == 0) {
		return null;
	}

	const refElem = document.querySelector(".overview h1");

	return (
		<div className="TotalMatchesFound" onClick={refElem ? () => refElem.scrollIntoView({ behavior: "smooth" }) : undefined}>
			{totalMatches} {t("matches_were_found")}
		</div>
	);
});
