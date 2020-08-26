import React, { useState } from "react";
import { FormWrapper } from "../components/FormWrapper";
import { ExchangeOfferOverview } from "../components/overviews/ExchangeOfferOverview";
import SampleStoreProvider from "../contexts/SampleContext";
import { SampleStore } from "../stores/SampleStore";
import { ExchangeRequest } from "../data/forms/ExchangeRequest";
import { createQueryStringFromFilters } from "../utils/formatting/matches";
import { useHistory } from "react-router-dom";

export const OffersPage = () => {
	const [sampleStore] = useState(new SampleStore());
	const history = useHistory();

	const submitRequest = () => {
		const { filters } = sampleStore;
		const queryString = createQueryStringFromFilters(filters);
		history.push(`/app/submit-request${queryString}`);
	};

	ExchangeRequest.handler = submitRequest;

	return (
		<SampleStoreProvider store={sampleStore}>
			<FormWrapper
				form={ExchangeRequest}
				handleSuccess={null}
				handleUpdate={sampleStore.setFilters}
			/>
			<ExchangeOfferOverview />
		</SampleStoreProvider>
	);
};
