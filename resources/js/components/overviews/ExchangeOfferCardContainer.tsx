import React from "react";
import { TExchangeOfferCard } from "../../typings/Overview";
import { ExchangeOfferCard } from "./ExchangeOfferCard";

type Props = {
	matches: TExchangeOfferCard[];
};

export const ExchangeOfferCardContainer: React.FC<Props> = ({ matches }) => {
	return (
		<div className="ExchangeOfferCardContainer">
			{matches.map(sample => (
				<ExchangeOfferCard key={sample.id} {...sample} />
			))}
		</div>
	);
};
