import React from "react";
import { requestCells } from "../../data/tables/requests";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { TExchangeAttempt } from "../../typings/exchanges";
import { convertAttemptsToCells } from "../../utils/formatting/matches";
import { RequestDashboardCard } from "../overviews/RequestCard";

export const ExchangeRequests: React.FC<{ requests: TExchangeAttempt[] }> = ({ requests }) => {
	const { t } = useTranslationStore();

	const cardsWithData = convertAttemptsToCells(requests, requestCells);

	return (
		<div className="ExchangeRequests layout-wrapper">
			{cardsWithData.map((data, idx) => (
				<RequestDashboardCard key={idx} data={data} sample={requests[idx]} />
			))}
		</div>
	);
};
