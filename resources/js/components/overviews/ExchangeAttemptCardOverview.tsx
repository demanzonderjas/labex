import { observer } from "mobx-react-lite";
import React from "react";
import { useState } from "react";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";
import { TExchangeAttempt } from "../../typings/exchanges";
import { TOverviewType, TTableCell } from "../../typings/overviews";
import { matchMeetsHardFilters } from "../../utils/filters/matches";
import {
	convertAttemptsToCells,
	fillFieldsWithSpecifications,
	mapMatchesToOverviewData
} from "../../utils/formatting/matches";
import { getMatchingPercentage } from "../../utils/matches/utils";
import { Button, SecondaryButton } from "../base/Button";
import { ExchangeAttemptCard } from "./ExchangeAttemptCard";

export const ExchangeAttemptCardOverview: React.FC<{
	attempts: TExchangeAttempt[];
	specsToShow: TTableCell[];
	type?: TOverviewType;
	SHOW_LIMIT?: number;
}> = observer(({ attempts, specsToShow, SHOW_LIMIT = 4, type = TOverviewType.Cards }) => {
	const [shouldViewAll, setShouldViewAll] = useState(false);
	const { magicField, filters, targetFields } = useExchangeAttemptStore();
	const sortedAttempts = attempts
		.filter(attempt => matchMeetsHardFilters(attempt, filters))
		.map(attempt => {
			const filledSampleFields = fillFieldsWithSpecifications(
				targetFields,
				attempt.specifications
			);
			return {
				...attempt,
				match_percentage: getMatchingPercentage(attempt, filters, filledSampleFields)
			};
		})
		.filter(attempt => attempt.match_percentage > 0);
	sortedAttempts.sort((a, b) => b.match_percentage - a.match_percentage);
	const cardsWithSpecs = mapMatchesToOverviewData(sortedAttempts, specsToShow, magicField);
	const cardsToShow = shouldViewAll ? cardsWithSpecs : cardsWithSpecs.slice(0, SHOW_LIMIT);

	return (
		<div className="ExchangeAttempts layout-wrapper">
			<div className="card-container">
				{cardsToShow.map((specsToShow, idx) => (
					<ExchangeAttemptCard
						key={sortedAttempts[idx].id}
						specsToShow={specsToShow}
						attempt={sortedAttempts[idx]}
						type={type}
					/>
				))}
			</div>
			{attempts.length > SHOW_LIMIT && !shouldViewAll && (
				<div className="layout-wrapper">
					<SecondaryButton label="load_more" handleClick={() => setShouldViewAll(true)} />
				</div>
			)}
		</div>
	);
});
