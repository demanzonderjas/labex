import React, { useState } from "react";
import { FormWrapper } from "../components/FormWrapper";
import { ExchangeOffer } from "../data/forms/ExchangeOffer";
import { ExchangeOfferOverview } from "../components/overviews/ExchangeOfferOverview";
import SampleStoreProvider from "../contexts/SampleContext";
import { SampleStore } from "../stores/SampleStore";

export const OfferFormPage = () => {
	const [sampleStore] = useState(new SampleStore());
	return (
		<SampleStoreProvider store={sampleStore}>
			<FormWrapper form={ExchangeOffer} handleSuccess={sampleStore.addOffer} />
			<ExchangeOfferOverview />
		</SampleStoreProvider>
	);
};
