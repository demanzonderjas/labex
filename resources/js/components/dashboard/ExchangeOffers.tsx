import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { TSampleCard } from "../../typings/Overview";
import { mapOffersToOverviewData } from "../../utils/formatting/matches";
import { ExchangeOfferCard, ExchangeOfferDashboardCard } from "../overviews/ExchangeOfferCard";

export const ExchangeOffers: React.FC<{ offers: TSampleCard[] }> = ({ offers }) => {
	const { t } = useTranslationStore();

	const offerCells = mapOffersToOverviewData(offers);

	return (
		<div className="ExchangeOffers layout-wrapper">
			{offerCells.map((data, idx) => (
				<ExchangeOfferDashboardCard key={idx} data={data} sample={offers[idx]} />
			))}
		</div>
	);
};
