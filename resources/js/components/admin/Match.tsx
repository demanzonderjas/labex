import React from "react";
import { ExchangeRequestCard } from "../overviews/ExchangeRequestCard";
import { ExchangeOfferCard } from "../overviews/ExchangeOfferCard";
import { TMatch } from "../../typings/Overview";
import { ApproveButtons } from "./ApproveButtons";

type Props = {
	match: TMatch;
};

export const Match: React.FC<Props> = ({ match }) => {
	return (
		<div className="Match" key={match.id}>
			<ExchangeRequestCard data={match.exchange_request} />
			<ExchangeOfferCard data={match.exchange_offer} />
			<ApproveButtons matchId={match.id} />
		</div>
	);
};
