import React, { useState } from "react";
import { FormWrapper } from "../components/FormWrapper";
import { ExchangeAttemptStore } from "../stores/ExchangeAttemptStore";
import ExchangeAttemptStoreProvider from "../contexts/ExchangeAttemptContext";
import { FilterRequestsForm } from "../data/forms/ExchangeAttemptRequest";
import { createQueryStringFromFilters } from "../utils/formatting/matches";
import { useHistory } from "react-router-dom";
import { ExchangeAttemptOverview } from "../components/overviews/ExchangeAttemptOverview";
import { requestMatchCells } from "../data/tables/matches";
import { TExchangeAttemptType } from "../typings/exchanges";

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
			<ExchangeAttemptOverview
				specsToShow={requestMatchCells}
				type={TExchangeAttemptType.Request}
				SHOW_LIMIT={10}
			/>
		</ExchangeAttemptStoreProvider>
	);
};
