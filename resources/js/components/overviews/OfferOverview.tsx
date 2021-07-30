import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSampleStore } from "../../hooks/useSampleStore";
import { OverviewType } from "../../typings/overviews";
import { OfferCardContainer } from "./OfferCardContainer";
import { OfferTable } from "./OfferTable";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { OverviewSwitch } from "./OverviewSwitch";
import { LoadMore } from "./LoadMore";

export const OfferOverview: React.FC = observer(() => {
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
		<div className="OfferOverview overview">
			<h1>
				{t("browse_offers")} ({totalMatches})
			</h1>
			<OverviewSwitch />
			{overviewType == OverviewType.Cards && (
				<OfferCardContainer matches={offerMatchOverviewData} />
			)}
			{overviewType == OverviewType.Table && <OfferTable matches={offerMatchOverviewData} />}
			{currentLimit < offers.length && <LoadMore />}
		</div>
	);
});
