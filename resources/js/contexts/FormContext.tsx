import React from "react";
import { useLocalStore } from "mobx-react";
import { FormStore } from "../stores/FormStore";

export const formStoreContext = React.createContext<FormStore | null>(null);

type Props = {
	children?: React.ReactNode;
	store: FormStore;
};

export const FormStoreProvider: React.FC<Props> = ({ store, children }) => {
	const storeHook = useLocalStore(() => store);

	return <formStoreContext.Provider value={storeHook}>{children}</formStoreContext.Provider>;
};

export default FormStoreProvider;
