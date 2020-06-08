import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSampleStore } from "../../hooks/useSampleStore";
import { OverviewType } from "../../typings/Overview";
import { ExchangeOfferCardContainer } from "./ExchangeOfferCardContainer";
import { ExchangeOfferTable } from "./ExchangeOfferTable";

export const ExchangeOfferOverview: React.FC = observer(() => {
	const { overviewType, matches, getSampleOffers } = useSampleStore();

	useEffect(() => {
		getSampleOffers();
	}, []);

	return (
		<div className="ExchangeOfferOverview">
			{overviewType == OverviewType.Cards && <ExchangeOfferCardContainer matches={matches} />}
			{overviewType == OverviewType.Table && <ExchangeOfferTable matches={matches} />}
		</div>
	);
});
