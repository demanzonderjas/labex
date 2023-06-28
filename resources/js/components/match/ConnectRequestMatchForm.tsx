import React, { useState, useEffect } from "react";
import ExchangeAttemptStoreProvider from "../../contexts/ExchangeAttemptContext";
import { ExchangeAttemptStore } from "../../stores/ExchangeAttemptStore";
import { getMyRequests } from "../../queries/getExchangeAttempts";
import { ConnectTable } from "./ConnectTable";

type Props = {
	offerId: string;
};

export const ConnectRequestMatchForm: React.FC<Props> = () => {
	const [attemptStore] = useState(new ExchangeAttemptStore());

	useEffect(() => {
		(async () => {
			const response = await getMyRequests();
			attemptStore.setAttempts(response.requests || []);
		})();
	}, []);

	return (
		<ExchangeAttemptStoreProvider store={attemptStore}>
			<ConnectTable />
		</ExchangeAttemptStoreProvider>
	);
};
