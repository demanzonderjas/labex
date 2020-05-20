import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSampleStore } from "../../hooks/useSampleStore";
import { SampleCard } from "./SampleCard";

export const ExchangeOfferOverview: React.FC = observer(() => {
	const { samples, getSampleOffers } = useSampleStore();

	useEffect(() => {
		getSampleOffers();
	}, []);

	return (
		<div className="ExchangeOfferOverview">
			{samples.map(sample => (
				<SampleCard key={sample.id} {...sample} />
			))}
		</div>
	);
});
