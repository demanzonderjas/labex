import React from "react";
import { observer } from "mobx-react-lite";
import { useMatchStore } from "../../hooks/useMatchStore";
import { Match } from "./Match";

export const ApproveMatchOverview = observer(() => {
	const { possibleMatches } = useMatchStore();
	return (
		<div className="ApproveMatchOverview overview">
			{possibleMatches.map(match => (
				<Match key={match.id} match={match} />
			))}
		</div>
	);
});
