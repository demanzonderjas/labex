import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { TSampleCard } from "../../typings/Overview";
import { mapRequestsToOverviewData } from "../../utils/formatting/matches";
import { requestColumns } from "../../data/tables/requests";

export const ExchangeRequests: React.FC<{ requests: TSampleCard[] }> = ({ requests }) => {
	const { t } = useTranslationStore();

	const requestCells = mapRequestsToOverviewData(requests);

	return (
		<div className="ExchangeRequestsTable table no-highlight">
			<table>
				<thead>
					<tr>
						{requestColumns.map(column => (
							<th key={column}>{t(column)}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{requestCells.map((cells, idx) => (
						<tr key={idx}>
							{cells.map((cell, cellIdx) => (
								<cell.Component
									key={cellIdx}
									rowIndex={idx}
									value={cell.value}
									sample={requests[idx]}
								/>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
