import React from "react";
import { TExchangeOfferCard } from "../../typings/Overview";
import { matchColumns, matchCells } from "../../data/tables/matches";
import { useTranslationStore } from "../../hooks/useTranslationStore";

type Props = {
	matches: TExchangeOfferCard[];
};

export const ExchangeOfferTable: React.FC<Props> = ({ matches }) => {
	const { t } = useTranslationStore();

	const rows = matches.map(match => {
		return matchCells.map(cell => {
			return { ...cell, value: match[cell.id] || cell.value };
		});
	});

	return (
		<div className="ExchangeOfferTable table">
			<table>
				<thead>
					<tr>
						{matchColumns.map(column => (
							<th key={column}>{t(column)}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((cells, idx) => (
						<tr key={idx}>
							{cells.map((cell, cellIdx) => (
								<cell.Component key={cellIdx} rowIndex={idx} value={cell.value} />
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
