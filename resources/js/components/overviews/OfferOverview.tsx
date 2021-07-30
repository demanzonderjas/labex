import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";
import { OverviewType } from "../../typings/overviews";
import { OfferCardContainer } from "./OfferCardContainer";
import { OfferTable } from "./OfferTable";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { OverviewSwitch } from "./OverviewSwitch";
import { LoadMore } from "./LoadMore";
import { getExchangeAttempts } from "../../queries/getExchangeAttempts";
import { TExchangeAttemptType } from "../../typings/exchanges";

export const OfferOverview: React.FC = observer(() => {
	const { overviewType, totalMatches, currentLimit, offers } = useExchangeAttemptStore();
	const { t } = useTranslationStore();

	useEffect(() => {
		(async () => {
			const data = getExchangeAttempts(TExchangeAttemptType.Offer);
			console.log(data);
		})();
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
