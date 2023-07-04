import React, { useState, useEffect } from "react";
import { ExchangeAttemptStore } from "../stores/ExchangeAttemptStore";
import ExchangeAttemptStoreProvider from "../contexts/ExchangeAttemptContext";
import { useQuery } from "../hooks/useQuery";
import { SubmitOfferForm } from "../data/forms/ExchangeAttemptOffer";
import { FilterOffersForm } from "../data/forms/ExchangeAttemptRequest";
import { observer } from "mobx-react-lite";
import { useParams, useHistory } from "react-router-dom";
import { getExchangeAttempt } from "../queries/getExchangeAttempts";
import { Specifications } from "../components/match/Specifications";
import { fillFieldsWithKeyValuePairs, fillFieldsWithSpecifications } from "../utils/formatting/matches";
import { PageIntro } from "../components/layout/PageIntro";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { getMatchingPercentage } from "../utils/matches/utils";
import { SecondaryButton, BlankButton, TertiaryButton } from "../components/base/Button";
import { useModalStore } from "../hooks/useModalStore";
import { confirmRequestMatchModal } from "../data/modals/confirm";
import { UserProfile } from "../components/match/UserProfile";
import { TUserProfile } from "../typings/user";
import { TExchangeAttempt, TExchangeAttemptType } from "../typings/exchanges";
import { MatchControls } from "../components/match/MatchControls";
import { connectRequestMatchModal } from "../data/modals/matches";

export const SelectOfferMatchPage: React.FC = observer(() => {
	const [sampleStore] = useState(new ExchangeAttemptStore());
	const [offer, setOffer] = useState([]);
	const [userProfile, setUserProfile] = useState<TUserProfile>(null);
	const [matchPercentage, setMatchPercentage] = useState(0);
	const [isMatch, setIsMatch] = useState(null);
	const { setModal } = useModalStore();

	const { loadFiltersFromKeyValuePairs, setFilters, filters } = sampleStore;
	const filterParams = useQuery();
	const history = useHistory();
	const { id }: any = useParams();
	const { t } = useTranslationStore();
	const goBack = () => {
		history.push(`/app/offers${window.location.search}`);
	};

	useEffect(() => {
		setFilters(FilterOffersForm.fields, false);
		loadFiltersFromKeyValuePairs(filterParams);
		(async () => {
			const response: {
				exchange_attempt: TExchangeAttempt;
				success: boolean;
			} = await getExchangeAttempt(id);
			const filledFields = fillFieldsWithSpecifications(SubmitOfferForm.fields, response.exchange_attempt.specifications);
			setOffer(filledFields);
			setIsMatch(response.exchange_attempt.is_match);
			const _matchPercentage = getMatchingPercentage(response.exchange_attempt, sampleStore.filters, filledFields);
			setMatchPercentage(_matchPercentage);
			setUserProfile({
				user: response.exchange_attempt.user,
				mine: response.exchange_attempt.is_mine
			});
		})();
	}, []);

	const selectMatchModalData = {
		...confirmRequestMatchModal,
		props: { fields: offer, filters, offerId: id }
	};

	const connectRequestMatchModalData = {
		...connectRequestMatchModal,
		props: { offerId: id, type: TExchangeAttemptType.Request }
	};

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
					handleConnect={() => setModal(connectRequestMatchModalData)}
					connectType={TExchangeAttemptType.Request}
				/>
			)}
			<div className="layout-wrapper SelectMatchPage">
				<Specifications fields={offer} filters={filters} matchPercentage={matchPercentage} />
				<UserProfile {...userProfile} />
				{!isMatch && (
					<div className="button-wrapper" style={{ display: "flex", gap: "20px" }}>
						<BlankButton label="return_to_overview" handleClick={goBack} />
						<SecondaryButton label="select_match" handleClick={() => setModal(selectMatchModalData)} />
						<TertiaryButton label="connect_to_existing" handleClick={() => setModal(connectRequestMatchModalData)} />
					</div>
				)}
			</div>
		</ExchangeAttemptStoreProvider>
	);
});
