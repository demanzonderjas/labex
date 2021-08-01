import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";
import { OverviewType } from "../../typings/overviews";
import { OfferCardContainer } from "./OfferCardContainer";
import { OfferTable } from "./OfferTable";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { OverviewSwitch } from "./OverviewSwitch";
import { LoadMore } from "./LoadMore";
import { TExchangeAttemptType } from "../../typings/exchanges";

export const OfferOverview: React.FC = observer(() => {
	const {
		overviewType,
		totalMatches,
		currentLimit,
		offers,
		attemptOverviewData,
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
			{overviewType == OverviewType.Cards && (
				<OfferCardContainer matches={attemptOverviewData} />
			)}
			{overviewType == OverviewType.Table && <OfferTable matches={attemptOverviewData} />}
			{currentLimit < offers.length && <LoadMore />}
		</div>
	);
});
