import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { PageIntro } from "../components/layout/PageIntro";
import { getMyMatches } from "../queries/getMatches";
import { Match } from "../components/match/Match";
import { TMatch } from "../typings/Overview";

export const MyMatchesPage = observer(() => {
	const { t } = useTranslationStore();
	const [matches, setMatches]: [TMatch[], Function] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await getMyMatches();
			if (response) {
				setMatches(response.matches);
			}
		})();
	}, []);

	return (
		<div className="MyMatchesPage">
			<PageIntro header="my_matches">
				<p className="layout-wrapper">{t("my_matches_intro")}</p>
			</PageIntro>
			<div className="matches layout-wrapper">
				{matches.map(match => (
					<Match key={match.id} match={match} />
				))}
			</div>
		</div>
	);
});
