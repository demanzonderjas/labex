import React, { useState } from "react";
import { FormWrapper } from "../components/FormWrapper";
import { ExchangeAttemptStore } from "../stores/ExchangeAttemptStore";
import ExchangeAttemptStoreProvider from "../contexts/ExchangeAttemptContext";
import { FilterRequestsForm } from "../data/forms/ExchangeAttemptRequest";
import { createQueryStringFromFilters } from "../utils/formatting/matches";
import { useNavigate } from "react-router-dom";
import { ExchangeAttemptOverview } from "../components/overviews/ExchangeAttemptOverview";
import { requestMatchCells } from "../data/tables/matches";
import { TExchangeAttemptType } from "../typings/exchanges";
import { observer } from "mobx-react-lite";
import { useUserStore } from "../hooks/useUserStore";

export const RequestsPage = observer(() => {
	const [sampleStore] = useState(new ExchangeAttemptStore());
	const navigate = useNavigate();
	const { userCanAddContent } = useUserStore();

	const submitOffer = () => {
		const { filters } = sampleStore;
		const queryString = createQueryStringFromFilters(filters);
		navigate(`/app/submit-offer${queryString}`);
	};

	FilterRequestsForm.handler = submitOffer;

	return (
		<ExchangeAttemptStoreProvider store={sampleStore}>
			<FormWrapper
				form={{
					...FilterRequestsForm,
					fields: FilterRequestsForm.fields.filter((f) => !f.hideAsFilter),
					hideSubmit: !userCanAddContent,
				}}
				handleUpdate={sampleStore.setFilters}
			/>
			<ExchangeAttemptOverview
				specsToShow={requestMatchCells}
				type={TExchangeAttemptType.Request}
				SHOW_LIMIT={10}
			/>
		</ExchangeAttemptStoreProvider>
	);
});
