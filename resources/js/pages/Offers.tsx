import React, { useState } from "react";
import { FormWrapper } from "../components/FormWrapper";
import ExchangeAttemptStoreProvider from "../contexts/ExchangeAttemptContext";
import { ExchangeAttemptStore } from "../stores/ExchangeAttemptStore";
import { FilterOffersForm } from "../data/forms/ExchangeAttemptRequest";
import { createQueryStringFromFilters } from "../utils/formatting/matches";
import { useNavigate } from "react-router-dom";
import { ExchangeAttemptOverview } from "../components/overviews/ExchangeAttemptOverview";
import { offerMatchCells } from "../data/tables/matches";
import { TExchangeAttemptType } from "../typings/exchanges";

export const OffersPage = () => {
	const [sampleStore] = useState(new ExchangeAttemptStore());
	const navigate = useNavigate();

	const submitRequest = () => {
		const { filters } = sampleStore;
		const queryString = createQueryStringFromFilters(filters);
		navigate(`/app/submit-request${queryString}`);
	};

	FilterOffersForm.handler = submitRequest;

	return (
		<ExchangeAttemptStoreProvider store={sampleStore}>
			<FormWrapper
				form={FilterOffersForm}
				handleSuccess={null}
				handleUpdate={sampleStore.setFilters}
			/>
			<ExchangeAttemptOverview
				specsToShow={offerMatchCells}
				type={TExchangeAttemptType.Offer}
				SHOW_LIMIT={10}
			/>
		</ExchangeAttemptStoreProvider>
	);
};
