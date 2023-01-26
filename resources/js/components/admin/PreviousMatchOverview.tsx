import React from "react";
import { observer } from "mobx-react-lite";
import { useMatchStore } from "../../hooks/useMatchStore";
import { Match } from "./Match";

export const PreviousMatchOverview = observer(() => {
	const { previousMatches } = useMatchStore();

	return (
		<div className="PreviousMatchOverview overview">
			{previousMatches.reverse().map(match => (
				<Match key={match.id} match={match} />
			))}
		</div>
	);
});
