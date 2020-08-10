import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { PageIntro } from "../components/layout/PageIntro";

export const MyMatchesPage = observer(() => {
	const { t } = useTranslationStore();
	return (
		<div className="MyMatchesPage">
			<PageIntro header="my_matches">
				<p className="layour-wrapper">{t("my_matches_intro")}</p>
			</PageIntro>
		</div>
	);
});
