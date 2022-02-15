import React, { useState } from "react";
import { ExchangeAttemptStore } from "../stores/ExchangeAttemptStore";
import ExchangeAttemptStoreProvider from "../contexts/ExchangeAttemptContext";
import { FormWrapper } from "../components/FormWrapper";
import { EditOfferForm } from "../data/forms/ExchangeAttemptOffer";
import { useParams } from "react-router-dom";
import { updateExchangeAttempt } from "../queries/sendExchangeAttempt";

export const EditOfferPage = () => {
	const [attemptStore] = useState(new ExchangeAttemptStore());
	const { id }: { id: string } = useParams();

	return (
		<ExchangeAttemptStoreProvider store={attemptStore}>
			<FormWrapper
				form={{ ...EditOfferForm, handler: data => updateExchangeAttempt(id, data) }}
				handleSuccess={attemptStore.addAttempt}
			/>
		</ExchangeAttemptStoreProvider>
	);
};
