import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useEffect } from "react";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { TExchangeAttemptType } from "../../typings/exchanges";
import { TOverviewType, TTableCell } from "../../typings/overviews";
import { convertAttemptsToMatches, convertMatchesToCells } from "../../utils/formatting/matches";
import { SecondaryButton } from "../base/Button";
import { ExchangeAttemptCardOverview } from "./ExchangeAttemptCardOverview";
import { ExchangeAttemptTable } from "./ExchangeAttemptTable";
import { OverviewSwitch } from "./OverviewSwitch";

export const ExchangeAttemptOverview: React.FC<{
	type: TExchangeAttemptType;
	specsToShow: TTableCell[];
	SHOW_LIMIT: number;
}> = observer(({ type, specsToShow, SHOW_LIMIT }) => {
	const {
		totalMatches,
		overviewType,
		offers,
		requests,
		attempts,
		getExchangeAttempts
	} = useExchangeAttemptStore();
	const { t } = useTranslationStore();
	const [shouldViewAll, setShouldViewAll] = useState(false);
	const { magicField, filters, targetFields } = useExchangeAttemptStore();
	const sortedAttempts = convertAttemptsToMatches(attempts, filters, targetFields);
	console.log(sortedAttempts);
	const attemptsAsCells = convertMatchesToCells(sortedAttempts, specsToShow, magicField);
	const attemptsToShow = shouldViewAll ? attemptsAsCells : attemptsAsCells.slice(0, SHOW_LIMIT);

	useEffect(() => {
		getExchangeAttempts(type);
	}, []);

	return (
		<div className="OfferOverview overview">
			<h1>
				{t(`browse_${type}s`)} ({totalMatches})
			</h1>
			<OverviewSwitch />
			{overviewType == TOverviewType.Cards && (
				<ExchangeAttemptCardOverview attempts={sortedAttempts} cards={attemptsToShow} />
			)}
			{overviewType == TOverviewType.Table && (
				<ExchangeAttemptTable
					attempts={sortedAttempts}
					rows={attemptsToShow}
					columns={
						magicField
							? specsToShow
							: specsToShow.filter(cell => cell.id != "magic_cell")
					}
				/>
			)}
			{sortedAttempts.length > SHOW_LIMIT && !shouldViewAll && (
				<div className="layout-wrapper">
					<SecondaryButton label="load_more" handleClick={() => setShouldViewAll(true)} />
				</div>
			)}
		</div>
	);
});
