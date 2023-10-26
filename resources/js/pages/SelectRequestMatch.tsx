import React, { useState, useEffect } from "react";
import { ExchangeAttemptStore } from "../stores/ExchangeAttemptStore";
import ExchangeAttemptStoreProvider from "../contexts/ExchangeAttemptContext";
import { useQuery } from "../hooks/useQuery";
import { FilterRequestsForm, RequestSpecificationsForm } from "../data/forms/ExchangeAttemptRequest";
import { observer } from "mobx-react-lite";
import { useParams, useHistory } from "react-router-dom";
import { Specifications } from "../components/match/Specifications";
import { fillFieldsWithSpecifications } from "../utils/formatting/matches";
import { PageIntro } from "../components/layout/PageIntro";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { getMatchingPercentage } from "../utils/matches/utils";
import { SecondaryButton, BlankButton, TertiaryButton } from "../components/base/Button";
import { getExchangeAttempt } from "../queries/getExchangeAttempts";
import { useModalStore } from "../hooks/useModalStore";
import { confirmOfferMatchModal } from "../data/modals/confirm";
import { createMatch } from "../queries/createMatch";
import { TUserProfile } from "../typings/user";
import { UserProfile } from "../components/match/UserProfile";
import { TExchangeAttempt, TExchangeAttemptType } from "../typings/exchanges";
import { MatchControls } from "../components/match/MatchControls";
import { connectOfferMatchModal } from "../data/modals/matches";

export const SelectRequestMatchPage: React.FC = observer(() => {
	const [sampleStore] = useState(new ExchangeAttemptStore());
	const [request, setRequest] = useState([]);
	const [attempt, setAttempt] = useState<TExchangeAttempt>(null);
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
		const response = await createMatch(offerData, id);
		confirm();
		history.push("/app/my-matches?info=true");
		return response;
	};
	const selectMatchModalData = {
		...confirmOfferMatchModal,
		form: { ...confirmOfferMatchModal.form, handler: confirmMatch }
	};

	const connectOfferMatchModalData = {
		...connectOfferMatchModal,
		props: { offerId: id, type: TExchangeAttemptType.Offer }
	};

	useEffect(() => {
		setFilters(FilterRequestsForm.fields, false);
		loadFiltersFromKeyValuePairs(filterParams);
		(async () => {
			const response: {
				exchange_attempt: TExchangeAttempt;
				success: boolean;
			} = await getExchangeAttempt(id);
			setAttempt(response.exchange_attempt);
			const filledFields = fillFieldsWithSpecifications(RequestSpecificationsForm.fields, response.exchange_attempt.specifications);
			setRequest(filledFields);
			const _matchPercentage = getMatchingPercentage(response.exchange_attempt, sampleStore.filters, filledFields);
			setIsMatch(response.exchange_attempt.is_match);
			setMatchPercentage(_matchPercentage);
			setUserProfile({
				user: response.exchange_attempt.user,
				mine: response.exchange_attempt.is_mine
			});
		})();
	}, []);

	if (isMatch === null || !userProfile) {
		return null;
	}

	return (
		<ExchangeAttemptStoreProvider store={sampleStore}>
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
			{!isMatch && (
				<MatchControls
					handleBack={goBack}
					handleSelect={() => setModal(selectMatchModalData)}
					handleConnect={() => setModal(connectOfferMatchModalData)}
					connectType={TExchangeAttemptType.Offer}
				/>
			)}
			<div className="layout-wrapper SelectMatchPage">
				<Specifications fields={request} filters={filters} matchPercentage={matchPercentage} attempt={attempt} />
				<UserProfile {...userProfile} />
				{!isMatch && (
					<div className="button-wrapper">
						<BlankButton label="return_to_overview" handleClick={goBack} />
						<SecondaryButton label="select_match" handleClick={() => setModal(selectMatchModalData)} />
						<TertiaryButton label="connect_to_offer" handleClick={() => setModal(connectOfferMatchModalData)} />
					</div>
				)}
			</div>
		</ExchangeAttemptStoreProvider>
	);
});
