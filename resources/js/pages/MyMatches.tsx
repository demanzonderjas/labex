import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { PageIntro, TwoColumnPageIntro } from "../components/layout/PageIntro";
import { getMyMatches } from "../queries/getMatches";
import { Match } from "../components/match/Match";
import { Button } from "../components/base/Button";
import { useModalStore } from "../hooks/useModalStore";
import { matchesModal } from "../data/modals/matches";
import { useQuery } from "../hooks/useQuery";
import { TMatch } from "../typings/exchanges";

export const MyMatchesPage = observer(() => {
	const { t } = useTranslationStore();
	const { setModal } = useModalStore();
	const [matches, setMatches]: [TMatch[], Function] = useState([]);
	const params: any = useQuery();

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
			<TwoColumnPageIntro header="my_matches" subheader="matches_subheader">
				<p className="layout-wrapper">{t("my_matches_intro")}</p>
			</TwoColumnPageIntro>
			<div className="matches layout-wrapper">
				{matches.map((match) => (
					<Match key={match.id} match={match} />
				))}
				{!matches.length && (
					<p style={{ margin: "2em 0", fontSize: 18 }}>
						{t("you_dont_have_any")}{" "}
						<span
							style={{
								textTransform: "lowercase",
								fontSize: "inherit",
							}}
						>
							{t("matches")}
						</span>
					</p>
				)}
			</div>
		</div>
	);
});
