import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";
import { LoadMore } from "./LoadMore";
import { OverviewSwitch } from "./OverviewSwitch";
import { OverviewType } from "../../typings/overviews";
import { RequestCardContainer } from "./RequestCardContainer";
import { RequestTable } from "./RequestTable";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { TExchangeAttemptType } from "../../typings/exchanges";

export const RequestOverview: React.FC = observer(() => {
	const {
		requests,
		currentLimit,
		overviewType,
		attemptOverviewData,
		getExchangeAttempts,
		totalMatches
	} = useExchangeAttemptStore();
	const { t } = useTranslationStore();

	useEffect(() => {
		getExchangeAttempts(TExchangeAttemptType.Request);
	}, []);

	return (
		<div className="RequestOverview overview">
			<h1>
				{t("browse_requests")} ({totalMatches})
			</h1>
			<OverviewSwitch />
			{overviewType == OverviewType.Cards && (
				<RequestCardContainer matches={attemptOverviewData} />
			)}
			{overviewType == OverviewType.Table && <RequestTable matches={attemptOverviewData} />}
			{currentLimit < requests.length && <LoadMore />}
		</div>
	);
});
