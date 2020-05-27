import React from "react";
import { useLocalStore } from "mobx-react";
import { MatchStore } from "../stores/MatchStore";

export const matchStoreContext = React.createContext<MatchStore | null>(null);

type Props = {
	children?: React.ReactNode;
	store: MatchStore;
};

export const MatchStoreProvider: React.FC<Props> = ({ store, children }) => {
	const storeHook = useLocalStore(() => store);

	return <matchStoreContext.Provider value={storeHook}>{children}</matchStoreContext.Provider>;
};

export default MatchStoreProvider;
