import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { getMyLatestExchangeOffers } from "../queries/getExchangeOffers";
import { getMyLatestExchangeRequests } from "../queries/getExchangeRequests";
import { TSampleCard } from "../typings/Overview";
import { PageIntro } from "../components/layout/PageIntro";
import { ExchangeOffers } from "../components/dashboard/ExchangeOffers";
import { SampleStore } from "../stores/SampleStore";
import SampleStoreProvider from "../contexts/SampleContext";
import { ExchangeRequests } from "../components/dashboard/ExchangeRequests";

export const DashboardPage = observer(() => {
	const { t } = useTranslationStore();
	const [sampleStore] = useState<SampleStore>(new SampleStore());
	const { offers, requests } = sampleStore;

	useEffect(() => {
		(async () => {
			const [offers, requests] = await Promise.all([
				getMyLatestExchangeOffers(),
				getMyLatestExchangeRequests()
			]);
			sampleStore.setOffers(offers.exchange_offers);
			sampleStore.setRequests(requests.exchange_requests);
		})();
	}, []);

	return (
		<SampleStoreProvider store={sampleStore}>
			<div className="DashboardPage">
				<PageIntro header="dashboard">
					<p className="layout-wrapper">{t("dashboard_intro")}</p>
				</PageIntro>
				<div className="offers">
					<h2 className="layout-wrapper">{t("last_offers")}</h2>
					<ExchangeOffers offers={offers} />
				</div>
				<div className="requests">
					<h2 className="layout-wrapper">{t("last_requests")}</h2>
					<ExchangeRequests requests={requests} />
				</div>
			</div>
		</SampleStoreProvider>
	);
});
