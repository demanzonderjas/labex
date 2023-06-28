import { observer } from "mobx-react-lite";
import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { convertMatchesToCells } from "../../utils/formatting/matches";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";
import { connectRequestCells } from "../../data/tables/requests";

export const ConnectTable: React.FC = observer(() => {
	const { t } = useTranslationStore();
	const { attempts } = useExchangeAttemptStore();

	const attemptsAsCells = convertMatchesToCells(attempts, connectRequestCells);

	return (
		<table className="not-centered">
			<thead>
				<tr>
					{connectRequestCells.map(cell => (
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
