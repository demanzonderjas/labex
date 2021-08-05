import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";
import { TOverviewType } from "../../typings/overviews";
import { OfferCardContainer } from "./OfferCardContainer";
import { OfferTable } from "./OfferTable";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { OverviewSwitch } from "./OverviewSwitch";
import { LoadMore } from "./LoadMore";
import { TExchangeAttemptType } from "../../typings/exchanges";
import { ExchangeAttemptCardOverview } from "./ExchangeAttemptCardOverview";
import { offerCells } from "../../data/tables/offers";

export const OfferOverview: React.FC = observer(() => {
	const {
		overviewType,
		totalMatches,
		currentLimit,
		offers,
		attemptOverviewData,
		targetMatchCells,
		getExchangeAttempts
	} = useExchangeAttemptStore();
	const { t } = useTranslationStore();

	useEffect(() => {
		getExchangeAttempts(TExchangeAttemptType.Offer);
	}, []);

	return (
		<div className="OfferOverview overview">
			<h1>
				{t("browse_offers")} ({totalMatches})
			</h1>
			<OverviewSwitch />
			{overviewType == TOverviewType.Cards && (
				<ExchangeAttemptCardOverview attempts={offers} specsToShow={targetMatchCells} />
			)}
			{overviewType == TOverviewType.Table && <OfferTable matches={attemptOverviewData} />}
			{/* {currentLimit < offers.length && <LoadMore />} */}
		</div>
	);
});
