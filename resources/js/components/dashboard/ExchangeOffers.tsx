import React from "react";
import { offerColumns } from "../../data/tables/offers";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { TSampleCard } from "../../typings/Overview";
import {
	mapOfferMatchesToOverviewData,
	mapOffersToOverviewData
} from "../../utils/formatting/matches";

export const ExchangeOffers: React.FC<{ offers: TSampleCard[] }> = ({ offers }) => {
	const { t } = useTranslationStore();

	const offerCells = mapOffersToOverviewData(offers);

	return (
		<div className="ExchangeOfferTable table no-highlight">
			<table>
				<thead>
					<tr>
						{offerColumns.map(column => (
							<th key={column}>{t(column)}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{offerCells.map((cells, idx) => (
						<tr key={idx}>
							{cells.map((cell, cellIdx) => (
								<cell.Component
									key={cellIdx}
									rowIndex={idx}
									value={cell.value}
									sample={offers[idx]}
								/>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
