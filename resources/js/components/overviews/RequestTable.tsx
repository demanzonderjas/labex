import React from "react";
import { requestMatchColumns } from "../../data/tables/matches";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { useHistory } from "react-router-dom";
import { createQueryStringFromFilters } from "../../utils/formatting/matches";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";

type Props = {
	matches: any;
};

export const RequestTable: React.FC<Props> = ({ matches }) => {
	const { t } = useTranslationStore();
	const { filters, matchType, matches: savedMatches, magicField } = useExchangeAttemptStore();
	const history = useHistory();
	const queryString = createQueryStringFromFilters(filters);
	const selectMatch = rowIndex => {
		history.push(`/app/${matchType}/select/${savedMatches[rowIndex].id}${queryString}`);
	};

	const magicColumns = () => {
		if (!magicField) {
			return requestMatchColumns.filter(column => column != "magic_cell");
		}
		const offerColumnsWithMagic = [...requestMatchColumns];
		const targetIdx = offerColumnsWithMagic.findIndex(column => column === "magic_cell");
		offerColumnsWithMagic[targetIdx] = magicField.id;
		return offerColumnsWithMagic;
	};

	return (
		<div className="RequestTable table">
			<table className="highlightable">
				<thead>
					<tr>
						{magicColumns().map(column => (
							<th key={column}>{t(column)}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{matches.map((cells, idx) => (
						<tr key={idx} onClick={() => selectMatch(idx)}>
							{cells
								.filter(cell => !!cell)
								.map((cell, cellIdx) => (
									<cell.Component
										key={cellIdx}
										rowIndex={idx}
										value={cell.value}
										sample={matches[idx]}
									/>
								))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
