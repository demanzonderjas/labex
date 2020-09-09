import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { TSampleCard } from "../../typings/Overview";
import { mapRequestsToOverviewData } from "../../utils/formatting/matches";
import { ExchangeRequestDashboardCard } from "../overviews/ExchangeRequestCard";

export const ExchangeRequests: React.FC<{ requests: TSampleCard[] }> = ({ requests }) => {
	const { t } = useTranslationStore();

	const requestCells = mapRequestsToOverviewData(requests);

	return (
		<div className="ExchangeRequests layout-wrapper">
			{requestCells.map((data, idx) => (
				<ExchangeRequestDashboardCard key={idx} data={data} sample={requests[idx]} />
			))}
		</div>
	);
};
