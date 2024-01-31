import React, { useState } from "react";
import { ExchangeAttemptStore } from "../stores/ExchangeAttemptStore";
import ExchangeAttemptStoreProvider from "../contexts/ExchangeAttemptContext";
import { FormWrapper } from "../components/FormWrapper";
import { useParams } from "react-router-dom";
import { updateExchangeAttempt } from "../queries/sendExchangeAttempt";
import { EditRequestForm } from "../data/forms/ExchangeAttemptRequest";

export const EditRequestPage = () => {
	const [attemptStore] = useState(new ExchangeAttemptStore());
	const { id } = useParams();

	return (
		<ExchangeAttemptStoreProvider store={attemptStore}>
			<FormWrapper
				form={{ ...EditRequestForm, handler: (data) => updateExchangeAttempt(id, data) }}
				handleSuccess={attemptStore.addAttempt}
			/>
		</ExchangeAttemptStoreProvider>
	);
};
