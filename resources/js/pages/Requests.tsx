import React, { useState } from "react";
import { FormWrapper } from "../components/FormWrapper";
import { ExchangeAttemptStore } from "../stores/ExchangeAttemptStore";
import ExchangeAttemptStoreProvider from "../contexts/SampleContext";
import { RequestOverview } from "../components/overviews/RequestOverview";
import { FilterRequestsForm } from "../data/forms/ExchangeAttemptRequest";
import { createQueryStringFromFilters } from "../utils/formatting/matches";
import { useHistory } from "react-router-dom";

export const RequestsPage = () => {
	const [sampleStore] = useState(new ExchangeAttemptStore());
	const history = useHistory();

	const submitOffer = () => {
		const { filters } = sampleStore;
		const queryString = createQueryStringFromFilters(filters);
		history.push(`/app/submit-offer${queryString}`);
	};

	FilterRequestsForm.handler = submitOffer;

	return (
		<ExchangeAttemptStoreProvider store={sampleStore}>
			<FormWrapper form={FilterRequestsForm} handleUpdate={sampleStore.setFilters} />
			<RequestOverview />
		</ExchangeAttemptStoreProvider>
	);
};
