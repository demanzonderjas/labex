import React, { useState } from "react";
import { FormWrapper } from "../components/FormWrapper";
import { SampleStore } from "../stores/SampleStore";
import SampleStoreProvider from "../contexts/SampleContext";
import { ExchangeRequestOverview } from "../components/overviews/ExchangeRequestOverview";
import { ExchangeOffer } from "../data/forms/ExchangeOffer";
import { MatchableButton } from "../components/base/Button";

export const RequestFormPage = () => {
	const [sampleStore] = useState(new SampleStore());
	return (
		<SampleStoreProvider store={sampleStore}>
			<FormWrapper
				form={ExchangeOffer}
				handleSuccess={sampleStore.addOffer}
				handleUpdate={fields => console.log(fields)}
			/>
			<ExchangeRequestOverview />
		</SampleStoreProvider>
	);
};
