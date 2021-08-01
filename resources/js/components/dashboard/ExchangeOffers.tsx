import React from "react";
import { offerCells } from "../../data/tables/offers";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { TExchangeAttempt } from "../../typings/exchanges";
import { convertAttemptsToCells } from "../../utils/formatting/matches";
import { OfferDashboardCard } from "../overviews/OfferCard";

export const ExchangeOffers: React.FC<{ offers: TExchangeAttempt[] }> = ({ offers }) => {
	const { t } = useTranslationStore();

	const cardsWithSpecs = convertAttemptsToCells(offers, offerCells);

	return (
		<div className="ExchangeOffers layout-wrapper">
			{cardsWithSpecs.map((data, idx) => (
				<OfferDashboardCard key={idx} data={data} attempt={offers[idx]} />
			))}
		</div>
	);
};
