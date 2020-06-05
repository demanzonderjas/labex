import React, { useState } from "react";
import { FormWrapper } from "../components/FormWrapper";
import { ExchangeOfferOverview } from "../components/overviews/ExchangeOfferOverview";
import SampleStoreProvider from "../contexts/SampleContext";
import { SampleStore } from "../stores/SampleStore";
import { ExchangeRequest } from "../data/forms/ExchangeRequest";

export const OfferFormPage = () => {
	const [sampleStore] = useState(new SampleStore());
	return (
		<SampleStoreProvider store={sampleStore}>
			<FormWrapper form={ExchangeRequest} handleSuccess={sampleStore.addRequest} />
			<ExchangeOfferOverview />
		</SampleStoreProvider>
	);
};
