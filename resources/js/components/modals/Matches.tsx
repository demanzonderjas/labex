import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { LocalImage } from "../base/Image";

export function MatchesModal() {
	const { t } = useTranslationStore();
	return (
		<>
			<p>{t("matches_intro")}</p>
			<div style={{ margin: "40px 0" }}>
				<LocalImage path="info/match-flowchart.png" />
			</div>
		</>
	);
}
