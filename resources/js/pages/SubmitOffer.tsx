import React, { useState } from "react";
import { ExchangeAttemptStore } from "../stores/ExchangeAttemptStore";
import ExchangeAttemptStoreProvider from "../contexts/SampleContext";
import { FormWrapper } from "../components/FormWrapper";
import { SubmitOfferForm } from "../data/forms/ExchangeAttemptOffer";

export const SubmitOfferPage = () => {
	const [attemptStore] = useState(new ExchangeAttemptStore());
	return (
		<ExchangeAttemptStoreProvider store={attemptStore}>
			<FormWrapper
				form={SubmitOfferForm}
				handleSuccess={attemptStore.addAttempt}
				handleUpdate={fields => console.log(fields)}
			/>
		</ExchangeAttemptStoreProvider>
	);
};
