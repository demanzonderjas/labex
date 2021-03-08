import React, { useState, useEffect } from "react";
import { SampleStore } from "../stores/SampleStore";
import SampleStoreProvider from "../contexts/SampleContext";
import { useQuery } from "../hooks/useQuery";
import { FilterRequestsForm } from "../data/forms/ExchangeRequest";
import { observer } from "mobx-react-lite";
import { useParams, useHistory } from "react-router-dom";
import { Specifications } from "../components/match/Specifications";
import { fillFieldsWithKeyValuePairs } from "../utils/formatting/matches";
import { PageIntro } from "../components/layout/PageIntro";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { getMatchingPercentage } from "../utils/matches/utils";
import { SecondaryButton, BlankButton } from "../components/base/Button";
import { getExchangeRequest } from "../queries/getExchangeRequests";
import { useModalStore } from "../hooks/useModalStore";
import { confirmOfferMatchModal } from "../data/modals/confirm";
import { createRequestMatch } from "../queries/createRequestMatch";
import { TUserProfile } from "../typings/User";
import { UserProfile } from "../components/match/UserProfile";

export const SelectRequestMatchPage: React.FC = observer(() => {
	const [sampleStore] = useState(new SampleStore());
	const [request, setRequest] = useState([]);
	const [matchPercentage, setMatchPercentage] = useState(0);
	const [userProfile, setUserProfile] = useState<TUserProfile>(null);
	const [isMatch, setIsMatch] = useState(null);
	const { setModal, confirm } = useModalStore();

	const { loadFiltersFromKeyValuePairs, setFilters, filters } = sampleStore;
	const filterParams = useQuery();
	const history = useHistory();
	const { id }: { id: string } = useParams();
	const { t } = useTranslationStore();
	const goBack = () => {
		history.push(`/app/requests${window.location.search}`);
	};

	const confirmMatch = async offerData => {
		const response = await createRequestMatch(offerData, id);
		confirm();
		history.push("/app/my-matches?info=true");
		return response;
	};
	const modalData = {
		...confirmOfferMatchModal,
		form: { ...confirmOfferMatchModal.form, handler: confirmMatch }
	};

	useEffect(() => {
		setFilters(FilterRequestsForm.fields, false);
		loadFiltersFromKeyValuePairs(filterParams);
		(async () => {
			const response = await getExchangeRequest(id);
			const filledFields = fillFieldsWithKeyValuePairs(
				FilterRequestsForm.fields,
				response.exchange_request
			);
			setRequest(filledFields);
			const _matchPercentage = getMatchingPercentage(
				response.exchange_request,
				sampleStore.filters,
				filledFields
			);
			setIsMatch(response.exchange_request.is_match);
			setMatchPercentage(_matchPercentage);
			setUserProfile({
				user: response.exchange_request.user,
				mine: response.exchange_request.is_mine
			});
		})();
	}, []);

	if (isMatch === null || !userProfile) {
		return null;
	}

	return (
		<SampleStoreProvider store={sampleStore}>
			{!isMatch && (
				<PageIntro header="selected_match">
					<p>{t("review_single_match")}</p>
					<ol>
						<li>{t("review_1")}</li>
						<li>{t("review_2")}</li>
						<li>{t("review_3")}</li>
					</ol>
				</PageIntro>
			)}
			<div className="layout-wrapper SelectMatchPage">
				<Specifications
					isMatch={isMatch}
					fields={request}
					filters={filters}
					matchPercentage={matchPercentage}
					handleBack={goBack}
					handleSelect={() => setModal(modalData)}
				/>
				<UserProfile {...userProfile} />
				{!isMatch && (
					<div className="button-wrapper">
						<BlankButton label="return_to_overview" handleClick={goBack} />
						<SecondaryButton
							label="select_match"
							handleClick={() => setModal(modalData)}
						/>
					</div>
				)}
			</div>
		</SampleStoreProvider>
	);
});
