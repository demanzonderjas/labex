import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { getMyLatestExchangeOffers } from "../queries/getExchangeOffers";
import { getMyLatestExchangeRequests } from "../queries/getExchangeRequests";
import { MatchType, TDashboardOverview } from "../typings/Overview";
import { TwoColumnPageIntro } from "../components/layout/PageIntro";
import { ExchangeOffers } from "../components/dashboard/ExchangeOffers";
import { SampleStore } from "../stores/SampleStore";
import SampleStoreProvider from "../contexts/SampleContext";
import { ExchangeRequests } from "../components/dashboard/ExchangeRequests";
import { getMyLatestMatch } from "../queries/getMatches";
import { Match } from "../components/match/Match";
import { Button } from "../components/base/Button";
import { useHistory } from "react-router-dom";
import { Overview } from "../components/dashboard/DashboardOverview";
import cx from "classnames";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { useUserStore } from "../hooks/useUserStore";
import { ExcelImport } from "../components/excel/ExcelImport";

export const DashboardPage = observer(() => {
	const { t } = useTranslationStore();
	const [sampleStore] = useState<SampleStore>(new SampleStore());
	const [match, setMatch] = useState(null);
	const [shouldViewAll, setShouldViewAll] = useState(false);
	const { user } = useUserStore();
	const [activeOverview, setActiveOverview] = useState<TDashboardOverview>(
		TDashboardOverview.Requests
	);
	const { offers, requests } = sampleStore;
	const history = useHistory();
	const DEFAULT_SHOW_LIMIT = 4;

	useEffect(() => {
		if (user && user.name == "Offer Demo") {
			setActiveOverview(TDashboardOverview.Offers);
		}
	}, [user]);

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
						handleClick={() => history.push("/app/faq")}
						classes={{ inline: true }}
					/>
				</TwoColumnPageIntro>
				<div className="layout-wrapper dashboard">
					<h1>{t("dashboard")}</h1>
					<p>
						{t("welcome")}, {user?.name}
					</p>
					<ExcelImport />
					<div className="submenu-with-overviews">
						<div className="submenu">
							<h3
								className={cx({
									active: activeOverview === TDashboardOverview.Requests,
									[activeOverview]: true
								})}
								onClick={() => setActiveOverview(TDashboardOverview.Requests)}
							>
								{t("my_requests")}
							</h3>
							<h3
								className={cx({
									active: activeOverview === TDashboardOverview.Offers,
									[activeOverview]: true
								})}
								onClick={() => setActiveOverview(TDashboardOverview.Offers)}
							>
								{t("my_offers")}
							</h3>
							<h3
								className={cx({
									active: activeOverview === TDashboardOverview.Matches,
									[activeOverview]: true
								})}
								onClick={() => setActiveOverview(TDashboardOverview.Matches)}
							>
								{t("my_matches")}
							</h3>
						</div>
						<div className="overviews">
							<Overview isActive={activeOverview === TDashboardOverview.Requests}>
								<div className="requests">
									<ExchangeRequests
										requests={
											shouldViewAll
												? requests
												: requests.slice(0, DEFAULT_SHOW_LIMIT)
										}
									/>
									{requests?.length > DEFAULT_SHOW_LIMIT && !shouldViewAll && (
										<div className="layout-wrapper">
											<Button
												label="see_all_requests"
												handleClick={() => setShouldViewAll(true)}
												classes={{ inline: true, primary: true }}
											/>
										</div>
									)}
								</div>
							</Overview>
							<Overview isActive={activeOverview === TDashboardOverview.Offers}>
								<div className="offers">
									<ExchangeOffers
										offers={
											shouldViewAll
												? offers
												: offers.slice(0, DEFAULT_SHOW_LIMIT)
										}
									/>
									{offers?.length > DEFAULT_SHOW_LIMIT && !shouldViewAll && (
										<div className="layout-wrapper">
											<Button
												label="see_all_offers"
												handleClick={() => setShouldViewAll(true)}
												classes={{ inline: true, primary: true }}
											/>
										</div>
									)}
								</div>
							</Overview>
							<Overview isActive={activeOverview === TDashboardOverview.Matches}>
								{match && (
									<div className="latest-match layout-wrapper">
										<Match
											key={match.id}
											match={match}
											matchType={MatchType.Requests}
										/>
										<Button
											label="see_all_my_matches"
											handleClick={() => history.push("/app/my-matches")}
											classes={{ inline: true, primary: true }}
										/>
									</div>
								)}
							</Overview>
							<DashboardStats />
						</div>
					</div>
				</div>
			</div>
		</SampleStoreProvider>
	);
});
