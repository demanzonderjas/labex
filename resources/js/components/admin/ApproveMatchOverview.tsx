import React from "react";
import { observer } from "mobx-react-lite";
import { useMatchStore } from "../../hooks/useMatchStore";

export const ApproveMatchOverview = observer(() => {
	const { possibleMatches } = useMatchStore();
	return (
		<div className="ApproveMatchOverview">
			{possibleMatches.map(match => (
				<div className="match" key={match.id}>
					{match.created_at}
				</div>
			))}
		</div>
	);
});
