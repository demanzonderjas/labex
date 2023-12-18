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
import { useSortedTable } from "../../hooks/useSortedTable";
import { toJS } from "mobx";

export const ExchangeAttemptOverview: React.FC<{
	type: TExchangeAttemptType;
	specsToShow: TTableCell[];
	mineOnly?: boolean;
	adminView?: boolean;
	SHOW_LIMIT: number;
}> = observer(({ type, specsToShow, SHOW_LIMIT, mineOnly, adminView }) => {
	const { t } = useTranslationStore();
	const [shouldViewAll, setShouldViewAll] = useState(false);
	const { magicField, filters, targetFields, overviewType, offers, requests, getExchangeAttempts } = useExchangeAttemptStore();
	const targetAttempts = type === TExchangeAttemptType.Offer ? offers : requests;
	const sortedAttempts = convertAttemptsToMatches(targetAttempts, filters, targetFields);
	const flattened = sortedAttempts.map(attempt => ({
		...attempt,
		...attempt.specifications.reduce((base, next) => {
			base[next.key] = next.value;
			return base;
		}, {})
	}));

	const { sorted, sortByColumn } = useSortedTable(flattened, "match_percentage");

	const attemptsAsCells = convertMatchesToCells(sorted, specsToShow, magicField);
	const attemptsToShow = attemptsAsCells;

	useEffect(() => {
		getExchangeAttempts(type, mineOnly, adminView);
	}, []);

	return (
		<div className={cx("overview", { dashboard: mineOnly })}>
			{!mineOnly && (
				<h1>
					{t(`browse_${type}s`)} ({attemptsAsCells.length})
				</h1>
			)}
			{!adminView && <OverviewSwitch />}
			{overviewType == TOverviewType.Cards && (
				<ExchangeAttemptCardOverview
					attempts={sorted}
					cards={attemptsToShow}
					type={mineOnly ? TOverviewType.UserCards : TOverviewType.Cards}
				/>
			)}
			{overviewType == TOverviewType.Table && (
				<ExchangeAttemptTable
					attempts={sorted}
					sortByColumn={sortByColumn}
					rows={attemptsToShow}
					type={type}
					isCentered={!mineOnly && !adminView}
					columns={magicField ? specsToShow : specsToShow.filter(cell => cell.id != "magic_cell")}
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
