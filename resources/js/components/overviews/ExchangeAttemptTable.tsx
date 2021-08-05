import React from "react";
import { useHistory } from "react-router";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { TExchangeAttempt, TSpecificationName } from "../../typings/exchanges";
import { TTableCell, TTableCellName } from "../../typings/overviews";
import { goToSelectMatchLink } from "../../utils/matches/utils";

export const ExchangeAttemptTable: React.FC<{
	attempts: TExchangeAttempt[];
	rows: TTableCell[][];
	columns: TTableCell[];
}> = ({ attempts, rows, columns }) => {
	const { t } = useTranslationStore();
	const { filters, magicField } = useExchangeAttemptStore();
	const history = useHistory();

	const magicColumns = () => {
		if (!magicField) {
			return columns.filter(column => column.id != TTableCellName.MagicCell);
		}
		const offerColumnsWithMagic = [...columns];
		const targetIdx = offerColumnsWithMagic.findIndex(column => {
			return column.id == TTableCellName.MagicCell;
		});
		offerColumnsWithMagic[targetIdx] = {
			...offerColumnsWithMagic[targetIdx],
			//@ts-ignore
			id: magicField.id
		};
		return offerColumnsWithMagic;
	};

	return (
		<div className="OfferTable table">
			<table className="highlightable">
				<thead>
					<tr>
						{magicColumns().map(column => (
							<th key={column.id}>{t(column.label || column.id)}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((specsToShow, idx) => (
						<tr
							key={idx}
							onClick={() => goToSelectMatchLink(history, attempts[idx], filters)}
						>
							{specsToShow
								.filter(cell => !!cell)
								.map((cell, cellIdx) => (
									<cell.Component
										key={cellIdx}
										rowIndex={idx}
										value={cell.value}
										attempt={attempts[idx]}
									/>
								))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
