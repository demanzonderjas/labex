import { observer } from "mobx-react-lite";
import React from "react";
import { requestMatchCells } from "../../data/tables/matches";
import { useTranslationStore } from "../../hooks/useTranslationStore";

export const ConnectTable: React.FC = observer(() => {
	const { t } = useTranslationStore();
	return (
		<table>
			<thead>
				<tr>
					{requestMatchCells.map(cell => (
						<th key={cell.id}>{t(cell.label || cell.id)}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{rows.map((specsToShow, idx) => (
					<tr key={idx} onClick={isCentered ? () => goToSelectMatchLink(history, attempts[idx], filters) : undefined}>
						{specsToShow
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
