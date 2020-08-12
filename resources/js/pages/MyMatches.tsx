import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { PageIntro } from "../components/layout/PageIntro";
import { getMyMatches } from "../queries/getMatches";

export const MyMatchesPage = observer(() => {
	const { t } = useTranslationStore();

	useEffect(() => {
		(async () => {
			const response = await getMyMatches();
			console.log(response);
		})();
	}, []);

	return (
		<div className="MyMatchesPage">
			<PageIntro header="my_matches">
				<p className="layour-wrapper">{t("my_matches_intro")}</p>
			</PageIntro>
		</div>
	);
});
