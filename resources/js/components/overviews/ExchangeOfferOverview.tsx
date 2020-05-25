import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSampleStore } from "../../hooks/useSampleStore";
import { ExchangeOfferCard } from "./ExchangeOfferCard";

export const ExchangeOfferOverview: React.FC = observer(() => {
	const { offers, getSampleOffers } = useSampleStore();

	useEffect(() => {
		getSampleOffers();
	}, []);

	return (
		<div className="ExchangeOfferOverview overview">
			{offers.map(sample => (
				<ExchangeOfferCard key={sample.id} {...sample} />
			))}
		</div>
	);
});
