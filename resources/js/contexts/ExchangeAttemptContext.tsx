import React from "react";
import { useLocalStore } from "mobx-react";
import { ExchangeAttemptStore } from "../stores/ExchangeAttemptStore";

export const exchangeAttemptContext = React.createContext<ExchangeAttemptStore | null>(null);

type Props = {
	children?: React.ReactNode;
	store: ExchangeAttemptStore;
};

export const ExchangeAttemptStoreProvider: React.FC<Props> = ({ store, children }) => {
	const storeHook = useLocalStore(() => store);

	return (
		<exchangeAttemptContext.Provider value={storeHook}>
			{children}
		</exchangeAttemptContext.Provider>
	);
};

export default ExchangeAttemptStoreProvider;
