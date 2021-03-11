import React from "react";
import { requestMatchColumns } from "../../data/tables/matches";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { useHistory } from "react-router-dom";
import { createQueryStringFromFilters } from "../../utils/formatting/matches";
import { useSampleStore } from "../../hooks/useSampleStore";

type Props = {
	matches: any;
};

export const ExchangeRequestTable: React.FC<Props> = ({ matches }) => {
	const { t } = useTranslationStore();
	const { filters, matchType, matches: savedMatches, magicRequestField } = useSampleStore();
	const history = useHistory();
	const queryString = createQueryStringFromFilters(filters);
	const selectMatch = rowIndex => {
		history.push(`/app/${matchType}/select/${savedMatches[rowIndex].id}${queryString}`);
	};

	const magicColumns = () => {
		if (!magicRequestField) {
			return requestMatchColumns.filter(column => column != "magic_cell");
		}
		const offerColumnsWithMagic = [...requestMatchColumns];
		const targetIdx = offerColumnsWithMagic.findIndex(column => column === "magic_cell");
		offerColumnsWithMagic[targetIdx] = magicRequestField.id;
		return offerColumnsWithMagic;
	};

	console.log(matches);

	return (
		<div className="ExchangeRequestTable table">
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
