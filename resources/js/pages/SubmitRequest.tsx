import React, { useState } from "react";
import { ExchangeAttemptStore } from "../stores/ExchangeAttemptStore";
import ExchangeAttemptStoreProvider from "../contexts/ExchangeAttemptContext";
import { FormWrapper } from "../components/FormWrapper";
import { SubmitRequestForm } from "../data/forms/ExchangeAttemptRequest";

export const SubmitRequestPage = () => {
	const [sampleStore] = useState(new ExchangeAttemptStore());

	return (
		<ExchangeAttemptStoreProvider store={sampleStore}>
			<FormWrapper
				form={SubmitRequestForm}
				handleSuccess={sampleStore.addAttempt}
				handleUpdate={fields => console.log(fields)}
			/>
		</ExchangeAttemptStoreProvider>
	);
};
