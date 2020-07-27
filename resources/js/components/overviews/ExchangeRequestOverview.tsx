import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSampleStore } from "../../hooks/useSampleStore";
import { ExchangeRequestCard } from "./ExchangeRequestCard";
import { LoadMore } from "./LoadMore";
import { OverviewSwitch } from "./OverviewSwitch";
import { OverviewType } from "../../typings/Overview";
import { ExchangeRequestCardContainer } from "./ExchangeRequestCardContainer";
import { ExchangeRequestTable } from "./ExchangeRequestTable";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { toJS } from "mobx";

export const ExchangeRequestOverview: React.FC = observer(() => {
	const {
		requests,
		getSampleRequests,
		currentLimit,
		overviewType,
		requestMatchOverviewData,
		totalMatches
	} = useSampleStore();
	const { t } = useTranslationStore();

	useEffect(() => {
		getSampleRequests();
	}, []);

	return (
		<div className="ExchangeRequestOverview overview">
			<h1>
				{t("browse_results")} ({totalMatches})
			</h1>
			<OverviewSwitch />
			{overviewType == OverviewType.Cards && (
				<ExchangeRequestCardContainer matches={requestMatchOverviewData} />
			)}
			{overviewType == OverviewType.Table && (
				<ExchangeRequestTable matches={requestMatchOverviewData} />
			)}
			{currentLimit < requests.length && <LoadMore />}
		</div>
	);
});
