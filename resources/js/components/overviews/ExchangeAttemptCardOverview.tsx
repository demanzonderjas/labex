import { observer } from "mobx-react-lite";
import React from "react";
import { TExchangeAttempt } from "../../typings/exchanges";
import { TOverviewType, TTableCell } from "../../typings/overviews";
import { ExchangeAttemptCard } from "./ExchangeAttemptCard";

export const ExchangeAttemptCardOverview: React.FC<{
	attempts: TExchangeAttempt[];
	cards: TTableCell[][];
	type?: TOverviewType;
}> = observer(({ attempts, cards, type = TOverviewType.Cards }) => {
	return (
		<div className="ExchangeAttempts layout-wrapper">
			<div className="card-container">
				{cards.map((specsToShow, idx) => (
					<ExchangeAttemptCard
						key={attempts[idx].id}
						specsToShow={specsToShow}
						attempt={attempts[idx]}
						type={type}
					/>
				))}
			</div>
		</div>
	);
});
