import React, { useState } from "react";
import { FormWrapper } from "../components/FormWrapper";
import { OfferOverview } from "../components/overviews/OfferOverview";
import SampleStoreProvider from "../contexts/SampleContext";
import { SampleStore } from "../stores/SampleStore";
import { FilterOffersForm } from "../data/forms/ExchangeAttemptRequest";
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

	FilterOffersForm.handler = submitRequest;

	return (
		<SampleStoreProvider store={sampleStore}>
			<FormWrapper
				form={FilterOffersForm}
				handleSuccess={null}
				handleUpdate={sampleStore.setFilters}
			/>
			<OfferOverview />
		</SampleStoreProvider>
	);
};
