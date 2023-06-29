import React, { useState, useEffect } from "react";
import ExchangeAttemptStoreProvider from "../../contexts/ExchangeAttemptContext";
import { ExchangeAttemptStore } from "../../stores/ExchangeAttemptStore";
import { getMyAttempts } from "../../queries/getExchangeAttempts";
import { ConnectTable } from "./ConnectTable";
import { TExchangeAttemptType } from "../../typings/exchanges";

type Props = {
	type: TExchangeAttemptType;
};

export const ConnectMatchForm: React.FC<Props> = ({ type }) => {
	const [attemptStore] = useState(new ExchangeAttemptStore());

	useEffect(() => {
		(async () => {
			const response = await getMyAttempts(type);
			attemptStore.setAttempts(response.attempts || []);
		})();
	}, []);

	return (
		<ExchangeAttemptStoreProvider store={attemptStore}>
			<ConnectTable type={type} />
		</ExchangeAttemptStoreProvider>
	);
};
