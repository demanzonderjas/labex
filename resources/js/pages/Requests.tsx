import React, { useState } from "react";
import { FormWrapper } from "../components/FormWrapper";
import { SampleStore } from "../stores/SampleStore";
import SampleStoreProvider from "../contexts/SampleContext";
import { ExchangeRequestOverview } from "../components/overviews/ExchangeRequestOverview";
import { ExchangeRequestSpecs } from "../data/forms/ExchangeRequest";

export const RequestsPage = () => {
	const [sampleStore] = useState(new SampleStore());
	return (
		<SampleStoreProvider store={sampleStore}>
			<FormWrapper form={ExchangeRequestSpecs} handleUpdate={sampleStore.setFilters} />
			<ExchangeRequestOverview />
		</SampleStoreProvider>
	);
};
