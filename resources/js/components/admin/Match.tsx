import React from "react";
import { RequestCard } from "../overviews/RequestCard";
import { OfferCard } from "../overviews/OfferCard";
import { TMatch, MatchType } from "../../typings/overviews";
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
