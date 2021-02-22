import React, { useState } from "react";
import { FormWrapper } from "../components/FormWrapper";
import { SampleStore } from "../stores/SampleStore";
import SampleStoreProvider from "../contexts/SampleContext";
import { ExchangeRequestOverview } from "../components/overviews/ExchangeRequestOverview";
import { FilterRequestsForm } from "../data/forms/ExchangeRequest";
import { createQueryStringFromFilters } from "../utils/formatting/matches";
import { useHistory } from "react-router-dom";

export const RequestsPage = () => {
	const [sampleStore] = useState(new SampleStore());
	const history = useHistory();

	const submitOffer = () => {
		const { filters } = sampleStore;
		const queryString = createQueryStringFromFilters(filters);
		history.push(`/app/submit-offer${queryString}`);
	};

	FilterRequestsForm.handler = submitOffer;

	return (
		<SampleStoreProvider store={sampleStore}>
			<FormWrapper form={FilterRequestsForm} handleUpdate={sampleStore.setFilters} />
			<ExchangeRequestOverview />
		</SampleStoreProvider>
	);
};
