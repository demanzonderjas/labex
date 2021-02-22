import React, { useState, useEffect } from "react";
import { SampleStore } from "../stores/SampleStore";
import SampleStoreProvider from "../contexts/SampleContext";
import { useQuery } from "../hooks/useQuery";
import { SubmitOfferForm } from "../data/forms/ExchangeOffer";
import { FilterOffersForm } from "../data/forms/ExchangeRequest";
import { observer } from "mobx-react-lite";
import { useParams, useHistory } from "react-router-dom";
import { getExchangeOffer } from "../queries/getExchangeOffers";
import { Specifications } from "../components/match/Specifications";
import { fillFieldsWithKeyValuePairs } from "../utils/formatting/matches";
import { PageIntro } from "../components/layout/PageIntro";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { getMatchingPercentage } from "../utils/matches/utils";
import { SecondaryButton, BlankButton } from "../components/base/Button";
import { useModalStore } from "../hooks/useModalStore";
import { confirmRequestMatchModal } from "../data/modals/confirm";
import { UserProfile } from "../components/match/UserProfile";
import { TUserProfile } from "../typings/User";

export const SelectOfferMatchPage: React.FC = observer(() => {
	const [sampleStore] = useState(new SampleStore());
	const [offer, setOffer] = useState([]);
	const [userProfile, setUserProfile] = useState<TUserProfile>(null);
	const [matchPercentage, setMatchPercentage] = useState(0);
	const [isMatch, setIsMatch] = useState(null);
	const { setModal } = useModalStore();

	const { loadFiltersFromKeyValuePairs, setFilters, filters } = sampleStore;
	const filterParams = useQuery();
	const history = useHistory();
	const { id } = useParams();
	const { t } = useTranslationStore();
	const goBack = () => {
		history.push(`/app/offers${window.location.search}`);
	};

	useEffect(() => {
		setFilters(FilterOffersForm.fields, false);
		loadFiltersFromKeyValuePairs(filterParams);
		(async () => {
			const response = await getExchangeOffer(id);
			const filledFields = fillFieldsWithKeyValuePairs(
				SubmitOfferForm.fields,
				response.exchange_offer
			);
			setOffer(filledFields);
			setIsMatch(response.exchange_offer.is_match);
			const _matchPercentage = getMatchingPercentage(
				response.exchange_offer,
				sampleStore.filters,
				filledFields
			);
			setMatchPercentage(_matchPercentage);
			setUserProfile({
				user: response.exchange_offer.user,
				mine: response.exchange_offer.is_mine
			});
		})();
	}, []);

	const modalData = {
		...confirmRequestMatchModal,
		props: { fields: offer, filters, offerId: id }
	};

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
					fields={offer}
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
