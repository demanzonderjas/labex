import React from "react";
import { ExchangeRequestCard } from "./ExchangeRequestCard";
import { TExchangeRequestCard } from "../../typings/Overview";

type Props = {
	matches: TExchangeRequestCard[];
};

export const ExchangeRequestCardContainer: React.FC<Props> = ({ matches }) => {
	return (
		<div className="ExchangeOfferCardContainer card-container">
			{matches.map((data, idx) => (
				<ExchangeRequestCard key={idx} data={data} index={idx} />
			))}
		</div>
	);
};
