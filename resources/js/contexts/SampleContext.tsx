import React from "react";
import { useLocalStore } from "mobx-react";
import { SampleStore } from "../stores/SampleStore";

export const sampleStoreContext = React.createContext<SampleStore | null>(null);

type Props = {
	children?: React.ReactNode;
	store: SampleStore;
};

export const SampleStoreProvider: React.FC<Props> = ({ store, children }) => {
	const storeHook = useLocalStore(() => store);

	return <sampleStoreContext.Provider value={storeHook}>{children}</sampleStoreContext.Provider>;
};

export default SampleStoreProvider;
