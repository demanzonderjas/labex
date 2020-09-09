import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { getMyLatestExchangeOffers } from "../queries/getExchangeOffers";
import { getMyLatestExchangeRequests } from "../queries/getExchangeRequests";
import { MatchType } from "../typings/Overview";
import { PageIntro, TwoColumnPageIntro } from "../components/layout/PageIntro";
import { ExchangeOffers } from "../components/dashboard/ExchangeOffers";
import { SampleStore } from "../stores/SampleStore";
import SampleStoreProvider from "../contexts/SampleContext";
import { ExchangeRequests } from "../components/dashboard/ExchangeRequests";
import { getMyLatestMatch } from "../queries/getMatches";
import { Match } from "../components/match/Match";
import { Button } from "../components/base/Button";
import { useModalStore } from "../hooks/useModalStore";
import { moreDashboardInfoModal } from "../data/modals/info";
import { useHistory } from "react-router-dom";

export const DashboardPage = observer(() => {
	const { t } = useTranslationStore();
	const [sampleStore] = useState<SampleStore>(new SampleStore());
	const [match, setMatch] = useState(null);
	const { offers, requests } = sampleStore;
	const { setModal } = useModalStore();
	const history = useHistory();

	useEffect(() => {
		(async () => {
			const [offers, requests, match] = await Promise.all([
				getMyLatestExchangeOffers(),
				getMyLatestExchangeRequests(),
				getMyLatestMatch()
			]);
			sampleStore.setOffers(offers.exchange_offers);
			sampleStore.setRequests(requests.exchange_requests);
			if (match && match.match) {
				setMatch(match.match);
			}
		})();
	}, []);

	return (
		<SampleStoreProvider store={sampleStore}>
			<div className="DashboardPage">
				<TwoColumnPageIntro header="exchange_platform" subheader="for_animals_tissues">
					<p className="layout-wrapper">{t("dashboard_intro")}</p>
					<Button
						label="more_info"
						handleClick={() => setModal(moreDashboardInfoModal)}
						classes={{ inline: true }}
					/>
				</TwoColumnPageIntro>
				<div className="layout-wrapper dashboard">
					<h1>{t("dashboard")}</h1>
				</div>

				<div className="offers">
					<ExchangeOffers offers={offers} />
					<div className="layout-wrapper">
						<Button
							label="see_all_offers"
							handleClick={() => history.push("/app/offers")}
							classes={{ inline: true, primary: true }}
						/>
					</div>
				</div>
				<div className="requests">
					<ExchangeRequests requests={requests} />
					<div className="layout-wrapper">
						<Button
							label="see_all_requests"
							handleClick={() => history.push("/app/requests")}
							classes={{ inline: true, primary: true }}
						/>
					</div>
				</div>
				{match && (
					<div className="latest-match layout-wrapper">
						<Match key={match.id} match={match} matchType={MatchType.Requests} />
						<Button
							label="see_all_my_matches"
							handleClick={() => history.push("/app/my-matches")}
							classes={{ inline: true, primary: true }}
						/>
					</div>
				)}
			</div>
		</SampleStoreProvider>
	);
});
