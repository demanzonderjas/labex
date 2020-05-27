import MatchStoreProvider from "../../contexts/MatchContext";
import React, { useState, useEffect } from "react";
import { MatchStore } from "../../stores/MatchStore";

export const MatchWrapper: React.FC = ({ children }) => {
	const [matchStore] = useState(new MatchStore());
	useEffect(() => {
		matchStore.getMatches();
	}, []);
	return <MatchStoreProvider store={matchStore}>{children}</MatchStoreProvider>;
};
