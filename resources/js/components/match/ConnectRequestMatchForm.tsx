import React, { useState, useEffect } from "react";
import { TFormField } from "../../typings/forms";
import { createMatchSpecs } from "../../utils/formatting/matches";
import { fieldIsNotHidden, fieldMeetsDependencies, fieldWasFilled } from "../../utils/filters/fields";
import { Spec } from "./Spec";
import ExchangeAttemptStoreProvider from "../../contexts/ExchangeAttemptContext";
import { ExchangeAttemptStore } from "../../stores/ExchangeAttemptStore";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { useModalStore } from "../../hooks/useModalStore";
import { BlankButton, Button } from "../base/Button";
import { createMatch } from "../../queries/createMatch";
import { useHistory } from "react-router-dom";
import { TSpecificationName } from "../../typings/exchanges";
import { getMyRequests } from "../../queries/getExchangeAttempts";

type Props = {
	offerId: string;
};

export const ConnectRequestMatchForm: React.FC<Props> = ({ offerId }) => {
	const [attemptStore] = useState(new ExchangeAttemptStore());
	const { cancel, confirm } = useModalStore();
	const history = useHistory();
	const { t } = useTranslationStore();

	// const confirmMatch = async (requestId: number) => {
	// 	const requestData = myRequests.find(r => r.id === requestId);
	// 	await createMatch(requestData, offerId);
	// 	confirm();
	// 	history.push("/app/my-matches?info=true");
	// };

	useEffect(() => {
		(async () => {
			const response = await getMyRequests();
			attemptStore.setAttempts(response.requests || []);
		})();
	}, []);

	return <ExchangeAttemptStoreProvider store={attemptStore}></ExchangeAttemptStoreProvider>;
};
