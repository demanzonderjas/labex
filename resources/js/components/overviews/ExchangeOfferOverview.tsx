import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSampleStore } from "../../hooks/useSampleStore";
import { OverviewType } from "../../typings/Overview";
import { ExchangeOfferCardContainer } from "./ExchangeOfferCardContainer";
import { ExchangeOfferTable } from "./ExchangeOfferTable";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { OverviewSwitch } from "./OverviewSwitch";
import { LoadMore } from "./LoadMore";

export const ExchangeOfferOverview: React.FC = observer(() => {
	const {
		overviewType,
		offerMatchOverviewData,
		getSampleOffers,
		totalMatches,
		currentLimit,
		offers
	} = useSampleStore();
	const { t } = useTranslationStore();

	useEffect(() => {
		getSampleOffers();
	}, []);

	return (
		<div className="ExchangeOfferOverview overview">
			<h1>
				{t("browse_offers")} ({totalMatches})
			</h1>
			<OverviewSwitch />
			{overviewType == OverviewType.Cards && (
				<ExchangeOfferCardContainer matches={offerMatchOverviewData} />
			)}
			{overviewType == OverviewType.Table && (
				<ExchangeOfferTable matches={offerMatchOverviewData} />
			)}
			{currentLimit < offers.length && <LoadMore />}
		</div>
	);
});
