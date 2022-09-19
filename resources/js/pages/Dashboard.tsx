import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { MatchType, TDashboardOverview } from "../typings/overviews";
import { TwoColumnPageIntro } from "../components/layout/PageIntro";
import { ExchangeAttemptStore } from "../stores/ExchangeAttemptStore";
import ExchangeAttemptStoreProvider from "../contexts/ExchangeAttemptContext";
import { getMyLatestMatch } from "../queries/getMatches";
import { Match } from "../components/match/Match";
import { Button } from "../components/base/Button";
import { useHistory } from "react-router-dom";
import { SubmenuView } from "../components/overviews/SubmenuView";
import cx from "classnames";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { useUserStore } from "../hooks/useUserStore";
import { getMyLatestExchangeAttempts } from "../queries/getExchangeAttempts";
import { offerCells } from "../data/tables/offers";
import { requestCells } from "../data/tables/requests";
import { ExchangeAttemptOverview } from "../components/overviews/ExchangeAttemptOverview";
import { TExchangeAttemptType } from "../typings/exchanges";

export const DashboardPage = observer(() => {
	const { t } = useTranslationStore();
	const [attemptStore] = useState<ExchangeAttemptStore>(new ExchangeAttemptStore());
	const [match, setMatch] = useState(null);
	const { user } = useUserStore();
	const [activeOverview, setActiveOverview] = useState<TDashboardOverview>(
		TDashboardOverview.Requests
	);
	const history = useHistory();

	useEffect(() => {
		if (user && user.name == "Offer Demo") {
			setActiveOverview(TDashboardOverview.Offers);
		}
	}, [user]);

	useEffect(() => {
		(async () => {
			const [attempts, match] = await Promise.all([
				getMyLatestExchangeAttempts(),
				getMyLatestMatch()
			]);
			attemptStore.setAttempts(attempts.exchange_attempts || []);
			if (match && match.match) {
				setMatch(match.match);
			}
		})();
	}, []);

	return (
		<ExchangeAttemptStoreProvider store={attemptStore}>
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
					{/* <ExcelImport /> */}
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
							<SubmenuView isActive={activeOverview === TDashboardOverview.Requests}>
								<ExchangeAttemptOverview
									specsToShow={requestCells}
									mineOnly={true}
									type={TExchangeAttemptType.Request}
									SHOW_LIMIT={4}
								/>
							</SubmenuView>
							<SubmenuView isActive={activeOverview === TDashboardOverview.Offers}>
								<ExchangeAttemptOverview
									specsToShow={offerCells}
									mineOnly={true}
									type={TExchangeAttemptType.Offer}
									SHOW_LIMIT={4}
								/>
							</SubmenuView>
							<SubmenuView isActive={activeOverview === TDashboardOverview.Matches}>
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
							</SubmenuView>
							{/* <DashboardStats /> */}
						</div>
					</div>
				</div>
			</div>
		</ExchangeAttemptStoreProvider>
	);
});
