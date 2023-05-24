import React, { useState } from "react";
import { ExchangeAttemptStore } from "../../stores/ExchangeAttemptStore";
import ExchangeAttemptStoreProvider from "../../contexts/ExchangeAttemptContext";
import { FormWrapper } from "../../components/FormWrapper";
import { EditOfferAsAdminForm, EditOfferForm } from "../../data/forms/ExchangeAttemptOffer";
import { useHistory, useParams } from "react-router-dom";
import { updateExchangeAttempt } from "../../queries/sendExchangeAttempt";

export const AdminEditOfferPage = () => {
	const [attemptStore] = useState(new ExchangeAttemptStore({ adminView: true }));
	const { offer_id }: { offer_id: string } = useParams();
	const history = useHistory();

	return (
		<ExchangeAttemptStoreProvider store={attemptStore}>
			<FormWrapper
				form={{
					...EditOfferAsAdminForm,
					handler: data => updateExchangeAttempt(offer_id, data)
				}}
				handleSuccess={() => history.goBack()}
			/>
		</ExchangeAttemptStoreProvider>
	);
};
