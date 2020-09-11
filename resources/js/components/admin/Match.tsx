import React from "react";
import { ExchangeRequestCard } from "../overviews/ExchangeRequestCard";
import { ExchangeOfferCard } from "../overviews/ExchangeOfferCard";
import { TMatch, MatchType } from "../../typings/Overview";
import { ApproveButtons } from "./ApproveButtons";
import { MatchCard } from "../match/MatchCard";
import { Match as MatchCards } from "../match/Match";

type Props = {
	match: TMatch;
};

export const Match: React.FC<Props> = ({ match }) => {
	return (
		<div className="AdminMatch" key={match.id}>
			<MatchCards match={match} matchType={MatchType.Admin} />
			<ApproveButtons matchId={match.id} />
		</div>
	);
};
