import React, { useState } from "react";
import { ExchangeRequest } from "../data/forms/ExchangeRequest";
import { FormWrapper } from "../components/FormWrapper";
import { SampleStore } from "../stores/SampleStore";
import SampleStoreProvider from "../contexts/SampleContext";
import { ExchangeRequestOverview } from "../components/overviews/ExchangeRequestOverview";

export const RequestFormPage = () => {
	const [sampleStore] = useState(new SampleStore());
	return (
		<SampleStoreProvider store={sampleStore}>
			<FormWrapper form={ExchangeRequest} handleSuccess={sampleStore.addRequest} />
			<ExchangeRequestOverview />
		</SampleStoreProvider>
	);
};
