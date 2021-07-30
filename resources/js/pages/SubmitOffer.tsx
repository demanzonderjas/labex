import React, { useState } from "react";
import { SampleStore } from "../stores/SampleStore";
import SampleStoreProvider from "../contexts/SampleContext";
import { FormWrapper } from "../components/FormWrapper";
import { SubmitOfferForm } from "../data/forms/ExchangeAttemptOffer";

export const SubmitOfferPage = () => {
	const [sampleStore] = useState(new SampleStore());
	return (
		<SampleStoreProvider store={sampleStore}>
			<FormWrapper
				form={SubmitOfferForm}
				handleSuccess={sampleStore.addOffer}
				handleUpdate={fields => console.log(fields)}
			/>
		</SampleStoreProvider>
	);
};
