import React, { useState, useEffect } from "react";
import { SampleStore } from "../stores/SampleStore";
import SampleStoreProvider from "../contexts/SampleContext";
import { useQuery } from "../hooks/useQuery";
import { ExchangeRequestsFilter } from "../data/forms/ExchangeOffer";
import { ExchangeRequest } from "../data/forms/ExchangeRequest";
import { observer } from "mobx-react-lite";
import { useParams, useHistory } from "react-router-dom";
import { Specifications } from "../components/match/Specifications";
import { fillFieldsWithKeyValuePairs } from "../utils/formatting/matches";
import { PageIntro } from "../components/layout/PageIntro";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { getMatchingPercentage } from "../utils/matches/utils";
import { SecondaryButton, BlankButton } from "../components/base/Button";
import { getExchangeRequest } from "../queries/getExchangeRequests";

export const SelectRequestMatchPage: React.FC = observer(() => {
	const [sampleStore] = useState(new SampleStore());
	const [request, setRequest] = useState([]);
	const [matchPercentage, setMatchPercentage] = useState(0);

	const { loadFiltersFromKeyValuePairs, setFilters, filters } = sampleStore;
	const filterParams = useQuery();
	const history = useHistory();
	const { id } = useParams();
	const { t } = useTranslationStore();
	const goBack = () => {
		history.push(`/app/requests${window.location.search}`);
	};

	useEffect(() => {
		setFilters(ExchangeRequestsFilter.fields, false);
		loadFiltersFromKeyValuePairs(filterParams);
		(async () => {
			const response = await getExchangeRequest(id);
			const filledFields = fillFieldsWithKeyValuePairs(
				ExchangeRequest.fields,
				response.exchange_request
			);
			setRequest(filledFields);
			const _matchPercentage = getMatchingPercentage(
				response.exchange_request,
				sampleStore.filters,
				filledFields
			);
			setMatchPercentage(_matchPercentage);
		})();
	}, []);

	return (
		<SampleStoreProvider store={sampleStore}>
			<PageIntro header="selected_match">
				<p>{t("review_single_match")}</p>
				<ol>
					<li>{t("review_1")}</li>
					<li>{t("review_2")}</li>
					<li>{t("review_3")}</li>
				</ol>
			</PageIntro>
			<div className="layout-wrapper">
				<Specifications
					fields={request}
					filters={filters}
					matchPercentage={matchPercentage}
					handleBack={goBack}
				/>
				<div className="button-wrapper">
					<BlankButton label="return_to_overview" handleClick={goBack} />
					<SecondaryButton label="select_match" />
				</div>
			</div>
		</SampleStoreProvider>
	);
});
