import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSampleStore } from "../../hooks/useSampleStore";
import { OverviewType } from "../../typings/Overview";
import { ExchangeOfferCardContainer } from "./ExchangeOfferCardContainer";
import { ExchangeOfferTable } from "./ExchangeOfferTable";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { OverviewSwitch } from "./OverviewSwitch";
import { SecondaryButton } from "../base/Button";

export const ExchangeOfferOverview: React.FC = observer(() => {
	const {
		overviewType,
		matchOverviewData,
		getSampleOffers,
		totalMatches,
		upgradeLimit,
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
				{t("browse_results")} ({totalMatches})
			</h1>
			<OverviewSwitch />
			{overviewType == OverviewType.Cards && (
				<ExchangeOfferCardContainer matches={matchOverviewData} />
			)}
			{overviewType == OverviewType.Table && (
				<ExchangeOfferTable matches={matchOverviewData} />
			)}
			{currentLimit < offers.length && (
				<div className="button-wrapper">
					<SecondaryButton label="load_more" handleClick={() => upgradeLimit()} />
				</div>
			)}
		</div>
	);
});
