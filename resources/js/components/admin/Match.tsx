import React from "react";
import { MatchType } from "../../typings/overviews";
import { ApproveButtons } from "./ApproveButtons";
import { Match as MatchCards } from "../match/Match";
import { TMatch } from "../../typings/exchanges";

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
