import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSampleStore } from "../../hooks/useSampleStore";
import { ExchangeRequestCard } from "./ExchangeRequestCard";
import { LoadMore } from "./LoadMore";

export const ExchangeRequestOverview: React.FC = observer(() => {
	const { requests, getSampleRequests, currentLimit } = useSampleStore();

	useEffect(() => {
		getSampleRequests();
	}, []);

	return (
		<div className="ExchangeRequestOverview overview">
			{requests.map(sample => (
				<ExchangeRequestCard key={sample.id} {...sample} />
			))}
			{currentLimit < requests.length && <LoadMore />}
		</div>
	);
});
