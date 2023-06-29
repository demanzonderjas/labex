import { observer } from "mobx-react-lite";
import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { convertMatchesToCells } from "../../utils/formatting/matches";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";
import { connectRequestCells } from "../../data/tables/requests";
import { TExchangeAttemptType } from "../../typings/exchanges";
import { connectOffersCells } from "../../data/tables/offers";

export const ConnectTable: React.FC<{ type: TExchangeAttemptType }> = observer(({ type }) => {
	const { t } = useTranslationStore();
	const { attempts } = useExchangeAttemptStore();

	const cells = type === TExchangeAttemptType.Offer ? connectOffersCells : connectRequestCells;

	const attemptsAsCells = convertMatchesToCells(attempts, cells);

	return (
		<table className="not-centered">
			<thead>
				<tr>
					{cells.map(cell => (
						<th key={cell.id}>{t(cell.label || cell.id)}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{attemptsAsCells.map((attempt, idx) => (
					<tr key={idx}>
						{attempt
							.filter(cell => !!cell)
							.map((cell, cellIdx) => (
								<cell.Component key={cellIdx} rowIndex={idx} value={cell.value} attempt={attempts[idx]} />
							))}
					</tr>
				))}
			</tbody>
		</table>
	);
});
