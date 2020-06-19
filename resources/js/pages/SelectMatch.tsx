import React, { useState, useEffect } from "react";
import { SampleStore } from "../stores/SampleStore";
import SampleStoreProvider from "../contexts/SampleContext";
import { useQuery } from "../hooks/useQuery";
import { ExchangeOffer } from "../data/forms/ExchangeOffer";
import { ExchangeRequest } from "../data/forms/ExchangeRequest";
import { observer } from "mobx-react-lite";
import { useParams, useHistory } from "react-router-dom";
import { getExchangeOffer } from "../queries/getExchangeOffers";
import { Specifications } from "../components/match/Specifications";
import { fillFieldsWithKeyValuePairs } from "../utils/formatting/matches";
import { PageIntro } from "../components/layout/PageIntro";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { getMatchingPercentage } from "../utils/matches/utils";
import { fieldMeetsDependencies } from "../utils/filters/fields";
import { SecondaryButton, BlankButton } from "../components/base/Button";

export const SelectMatchPage: React.FC = observer(() => {
	const [sampleStore] = useState(new SampleStore());
	const [offer, setOffer] = useState([]);
	const [matchPercentage, setMatchPercentage] = useState(0);

	const { loadFiltersFromKeyValuePairs, setFilters, filters } = sampleStore;
	const filterParams = useQuery();
	const history = useHistory();
	const { id } = useParams();
	const { t } = useTranslationStore();

	useEffect(() => {
		setFilters(ExchangeRequest.fields, false);
		loadFiltersFromKeyValuePairs(filterParams);
		(async () => {
			const response = await getExchangeOffer(id);
			const filledFields = fillFieldsWithKeyValuePairs(
				ExchangeOffer.fields,
				response.exchange_offer
			);
			setOffer(filledFields);
			const _matchPercentage = getMatchingPercentage(
				response.exchange_offer,
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
					fields={offer}
					filters={filters}
					matchPercentage={matchPercentage}
				/>
				<div className="button-wrapper">
					<BlankButton
						label="return_to_overview"
						handleClick={() => {
							history.push(`/app/offers${window.location.search}`);
						}}
					/>
					<SecondaryButton label="select_match" />
				</div>
			</div>
		</SampleStoreProvider>
	);
});