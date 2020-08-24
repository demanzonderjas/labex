import React, { useState } from "react";
import { SampleStore } from "../stores/SampleStore";
import SampleStoreProvider from "../contexts/SampleContext";
import { FormWrapper } from "../components/FormWrapper";
import { SubmitExchangeRequest } from "../data/forms/ExchangeRequest";

export const SubmitRequestPage = () => {
	const [sampleStore] = useState(new SampleStore());
	return (
		<SampleStoreProvider store={sampleStore}>
			<FormWrapper
				form={SubmitExchangeRequest}
				handleSuccess={sampleStore.addRequest}
				handleUpdate={fields => console.log(fields)}
			/>
		</SampleStoreProvider>
	);
};
