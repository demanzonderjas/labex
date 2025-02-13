import React, { useState, useEffect } from "react";
import { ExchangeAttemptStore } from "../stores/ExchangeAttemptStore";
import ExchangeAttemptStoreProvider from "../contexts/ExchangeAttemptContext";
import { useQuery } from "../hooks/useQuery";
import {
	FilterRequestsForm,
	RequestSpecificationsForm,
} from "../data/forms/ExchangeAttemptRequest";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
import { Specifications } from "../components/match/Specifications";
import { fillFieldsWithSpecifications } from "../utils/formatting/matches";
import { PageIntro } from "../components/layout/PageIntro";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { getMatchingPercentage } from "../utils/matches/utils";
import { SecondaryButton, BlankButton, Button } from "../components/base/Button";
import { getExchangeAttempt } from "../queries/getExchangeAttempts";
import { useModalStore } from "../hooks/useModalStore";
import { confirmOfferMatchModal } from "../data/modals/confirm";
import { createMatch } from "../queries/createMatch";
import { TUserProfile } from "../typings/user";
import { UserProfile } from "../components/match/UserProfile";
import { TExchangeAttempt } from "../typings/exchanges";
import { useUserStore } from "../hooks/useUserStore";
import { goToEditLink } from "../utils/routing/url";

export const SelectRequestMatchPage: React.FC = observer(() => {
	const [sampleStore] = useState(new ExchangeAttemptStore());
	const [request, setRequest] = useState([]);
	const [matchPercentage, setMatchPercentage] = useState(0);
	const [attempt, setActiveAttempt] = useState(null);
	const [userProfile, setUserProfile] = useState<TUserProfile>(null);
	const [isMatch, setIsMatch] = useState(null);
	const { setModal, confirm } = useModalStore();
	const { userCanAddContent } = useUserStore();

	const { loadFiltersFromKeyValuePairs, setFilters, filters } = sampleStore;
	const filterParams = useQuery();
	const navigate = useNavigate();
	const { id } = useParams();
	const { t } = useTranslationStore();
	const goBack = () => {
		navigate(-1);
	};

	const confirmMatch = async (offerData) => {
		const response = await createMatch(offerData, id);
		confirm();
		navigate("/app/my-matches?info=true");
		return response;
	};
	const modalData = {
		...confirmOfferMatchModal,
		form: { ...confirmOfferMatchModal.form, handler: confirmMatch },
	};

	useEffect(() => {
		setFilters(FilterRequestsForm.fields, false);
		loadFiltersFromKeyValuePairs(filterParams);
		(async () => {
			const response: {
				exchange_attempt: TExchangeAttempt;
				success: boolean;
			} = await getExchangeAttempt(id);
			setActiveAttempt(response.exchange_attempt);
			const filledFields = fillFieldsWithSpecifications(
				RequestSpecificationsForm.fields,
				response.exchange_attempt.specifications
			);
			setRequest(filledFields);
			const _matchPercentage = getMatchingPercentage(
				response.exchange_attempt,
				sampleStore.filters,
				filledFields
			);
			setIsMatch(response.exchange_attempt.is_match);
			setMatchPercentage(_matchPercentage);
			setUserProfile({
				user: response.exchange_attempt.user,
				mine: response.exchange_attempt.is_mine,
			});
		})();
	}, []);

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
			<div className="layout-wrapper SelectMatchPage">
				<Specifications
					isMatch={isMatch}
					fields={request}
					filters={filters}
					attempt={attempt}
					matchPercentage={matchPercentage}
					handleBack={goBack}
					handleSelect={() => setModal(modalData)}
				/>
				<UserProfile {...userProfile} />
				{!isMatch && (
					<div className="button-wrapper">
						<BlankButton label="return_to_overview" handleClick={goBack} />
						{!!attempt && !!attempt.is_mine && (
							<Button
								handleClick={() => goToEditLink(navigate, attempt)}
								label="edit"
								classes={{ primary: true }}
							/>
						)}
						{!!userCanAddContent && (
							<SecondaryButton
								label="select_match"
								handleClick={() => setModal(modalData)}
							/>
						)}
					</div>
				)}
			</div>
		</ExchangeAttemptStoreProvider>
	);
});
