import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSampleStore } from "../../hooks/useSampleStore";
import { LoadMore } from "./LoadMore";
import { OverviewSwitch } from "./OverviewSwitch";
import { OverviewType } from "../../typings/overviews";
import { RequestCardContainer } from "./RequestCardContainer";
import { RequestTable } from "./RequestTable";
import { useTranslationStore } from "../../hooks/useTranslationStore";

export const RequestOverview: React.FC = observer(() => {
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
		<div className="RequestOverview overview">
			<h1>
				{t("browse_requests")} ({totalMatches})
			</h1>
			<OverviewSwitch />
			{overviewType == OverviewType.Cards && (
				<RequestCardContainer matches={requestMatchOverviewData} />
			)}
			{overviewType == OverviewType.Table && (
				<RequestTable matches={requestMatchOverviewData} />
			)}
			{currentLimit < requests.length && <LoadMore />}
		</div>
	);
});
