import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { getMyLatestExchangeOffers } from "../queries/getExchangeOffers";
import { getMyLatestExchangeRequests } from "../queries/getExchangeRequests";
import { TSampleCard } from "../typings/Overview";
import { PageIntro } from "../components/layout/PageIntro";

export const DashboardPage = observer(() => {
	const { t } = useTranslationStore();
	const [offers, setOffers] = useState<TSampleCard[]>([]);
	const [requests, setRequests] = useState<TSampleCard[]>([]);

	useEffect(() => {
		(async () => {
			const [offers, requests] = await Promise.all([
				getMyLatestExchangeOffers(),
				getMyLatestExchangeRequests()
			]);
			setOffers(offers);
			setRequests(requests);
		})();
	}, []);

	return (
		<div className="DashboardPage">
			<PageIntro header="dashboard">
				<p className="layout-wrapper">{t("dashboard_intro")}</p>
			</PageIntro>
		</div>
	);
});
