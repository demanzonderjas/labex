import React, { useState } from "react";
import { ExchangeAttemptStore } from "../../stores/ExchangeAttemptStore";
import ExchangeAttemptStoreProvider from "../../contexts/ExchangeAttemptContext";
import { FormWrapper } from "../../components/FormWrapper";
import { EditOfferAsAdminForm } from "../../data/forms/ExchangeAttemptOffer";
import { useNavigate, useParams } from "react-router-dom";
import { updateExchangeAttempt } from "../../queries/sendExchangeAttempt";

export const AdminEditOfferPage = () => {
	const [attemptStore] = useState(new ExchangeAttemptStore({ adminView: true }));
	const { offer_id } = useParams();
	const navigate = useNavigate();

	return (
		<ExchangeAttemptStoreProvider store={attemptStore}>
			<FormWrapper
				form={{
					...EditOfferAsAdminForm,
					handler: (data) => updateExchangeAttempt(offer_id, data),
				}}
				handleSuccess={() => navigate(-1)}
			/>
		</ExchangeAttemptStoreProvider>
	);
};
