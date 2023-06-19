import React, { useState } from "react";
import { ExchangeAttemptStore } from "../stores/ExchangeAttemptStore";
import ExchangeAttemptStoreProvider from "../contexts/ExchangeAttemptContext";
import { FormWrapper } from "../components/FormWrapper";
import { SubmitOfferForm } from "../data/forms/ExchangeAttemptOffer";

export const SubmitOfferPage = () => {
	const [attemptStore] = useState(new ExchangeAttemptStore());
	return (
		<ExchangeAttemptStoreProvider store={attemptStore}>
			<FormWrapper form={SubmitOfferForm} handleSuccess={attemptStore.addAttempt} />
		</ExchangeAttemptStoreProvider>
	);
};
