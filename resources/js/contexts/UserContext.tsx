import React from "react";
import { useLocalStore } from "mobx-react";
import { UserStore } from "../stores/UserStore";

export const UserStoreContext = React.createContext<UserStore | null>(null);

type Props = {
	children?: React.ReactNode;
	store: UserStore;
};

export const UserStoreProvider: React.FC<Props> = ({ store, children }) => {
	const storeHook = useLocalStore(() => store);

	return <UserStoreContext.Provider value={storeHook}>{children}</UserStoreContext.Provider>;
};

export default UserStoreProvider;
