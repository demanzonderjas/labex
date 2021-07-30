import React, { useState } from "react";
import { ExchangeAttemptStore } from "../stores/ExchangeAttemptStore";
import ExchangeAttemptStoreProvider from "../contexts/SampleContext";
import { FormWrapper } from "../components/FormWrapper";
import { SubmitRequestForm } from "../data/forms/ExchangeAttemptRequest";

export const SubmitRequestPage = () => {
	const [sampleStore] = useState(new ExchangeAttemptStore());

	return (
		<ExchangeAttemptStoreProvider store={sampleStore}>
			<FormWrapper
				form={SubmitRequestForm}
				handleSuccess={sampleStore.addRequest}
				handleUpdate={fields => console.log(fields)}
			/>
		</ExchangeAttemptStoreProvider>
	);
};
