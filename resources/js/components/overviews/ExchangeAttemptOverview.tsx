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
import cx from "classnames";

export const ExchangeAttemptOverview: React.FC<{
	type: TExchangeAttemptType;
	specsToShow: TTableCell[];
	mineOnly?: boolean;
	SHOW_LIMIT: number;
}> = observer(({ type, specsToShow, SHOW_LIMIT, mineOnly }) => {
	const { t } = useTranslationStore();
	const [shouldViewAll, setShouldViewAll] = useState(false);
	const {
		magicField,
		filters,
		targetFields,
		overviewType,
		offers,
		requests,
		getExchangeAttempts
	} = useExchangeAttemptStore();
	const targetAttempts = type === TExchangeAttemptType.Offer ? offers : requests;
	const sortedAttempts = convertAttemptsToMatches(targetAttempts, filters, targetFields);
	const attemptsAsCells = convertMatchesToCells(sortedAttempts, specsToShow, magicField);
	const attemptsToShow = shouldViewAll ? attemptsAsCells : attemptsAsCells.slice(0, SHOW_LIMIT);

	useEffect(() => {
		console.log(type, mineOnly);
		getExchangeAttempts(type, mineOnly);
	}, []);

	return (
		<div className={cx("overview", { dashboard: mineOnly })}>
			{!mineOnly && (
				<h1>
					{t(`browse_${type}s`)} ({attemptsAsCells.length})
				</h1>
			)}
			<OverviewSwitch />
			{overviewType == TOverviewType.Cards && (
				<ExchangeAttemptCardOverview
					attempts={sortedAttempts}
					cards={attemptsToShow}
					type={mineOnly ? TOverviewType.UserCards : TOverviewType.Cards}
				/>
			)}
			{overviewType == TOverviewType.Table && (
				<ExchangeAttemptTable
					attempts={sortedAttempts}
					rows={attemptsToShow}
					type={type}
					isCentered={!mineOnly}
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
