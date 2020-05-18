import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../hooks/useTranslationStore";

export const MyMatchesPage = observer(() => {
	const { t } = useTranslationStore();
	return (
		<div className="MyMatchesPage">
			<h1>{t("my_matches")}</h1>
		</div>
	);
});
