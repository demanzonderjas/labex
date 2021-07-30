import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { TSampleCard } from "../../typings/overviews";
import { mapRequestsToOverviewData } from "../../utils/formatting/matches";
import { RequestDashboardCard } from "../overviews/RequestCard";

export const ExchangeRequests: React.FC<{ requests: TSampleCard[] }> = ({ requests }) => {
	const { t } = useTranslationStore();

	const requestCells = mapRequestsToOverviewData(requests);

	return (
		<div className="ExchangeRequests layout-wrapper">
			{requestCells.map((data, idx) => (
				<RequestDashboardCard key={idx} data={data} sample={requests[idx]} />
			))}
		</div>
	);
};
