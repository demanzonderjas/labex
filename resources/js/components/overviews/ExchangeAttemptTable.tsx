import React from "react";
import { useNavigate } from "react-router";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { TExchangeAttempt, TExchangeAttemptType } from "../../typings/exchanges";
import { TTableCell, TTableCellName } from "../../typings/overviews";
import { goToSelectMatchLink } from "../../utils/matches/utils";
import cx from "classnames";

export const ExchangeAttemptTable: React.FC<{
	attempts: TExchangeAttempt[];
	rows: TTableCell[][];
	columns: TTableCell[];
	type: TExchangeAttemptType;
	isCentered: boolean;
}> = ({ attempts, rows, columns, isCentered, type }) => {
	const { t } = useTranslationStore();
	const { filters, magicField } = useExchangeAttemptStore();
	const navigate = useNavigate();

	const magicColumns = () => {
		if (!magicField) {
			return columns.filter((column) => column.id != TTableCellName.MagicCell);
		}
		const offerColumnsWithMagic = [...columns];
		const targetIdx = offerColumnsWithMagic.findIndex((column) => {
			return column.id == TTableCellName.MagicCell;
		});
		offerColumnsWithMagic[targetIdx] = {
			...offerColumnsWithMagic[targetIdx],
			//@ts-ignore
			id: magicField.id,
		};
		return offerColumnsWithMagic;
	};

	return (
		<div className={cx("OfferTable table", { [type]: true })}>
			<table className={cx({ "not-centered": !isCentered, highlightable: isCentered })}>
				<thead>
					<tr>
						{magicColumns().map((column) => (
							<th key={column.id}>{t(column.label || column.id)}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((specsToShow, idx) => (
						<tr
							key={idx}
							onClick={
								isCentered
									? () => goToSelectMatchLink(navigate, attempts[idx], filters)
									: undefined
							}
						>
							{specsToShow
								.filter((cell) => !!cell)
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
