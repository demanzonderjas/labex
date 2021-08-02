import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { MatchType } from "../../typings/overviews";
import { getStatusFromMatch } from "../../utils/matches/status";
import { convertDateToReadableString } from "../../utils/formatting/datetime";
import { getMatchingPercentage } from "../../utils/matches/utils";
import {
	fillFieldsWithKeyValuePairs,
	createMatchSpecs,
	createQueryStringFromFilters,
	fillFieldsWithSpecifications
} from "../../utils/formatting/matches";
import { SubmitOfferForm } from "../../data/forms/ExchangeAttemptOffer";
import { RequestMatchCardFields } from "../../data/forms/ExchangeAttemptRequest";
import { Percentage } from "../base/Percentage";
import { MatchCard } from "./MatchCard";
import { useHistory } from "react-router-dom";
import cx from "classnames";
import { Button, DangerButton } from "../base/Button";
import { cancelMatch } from "../../queries/cancelMatch";
import { useModalStore } from "../../hooks/useModalStore";
import { confirmCancelMatchModal } from "../../data/modals/confirm";
import { TMatch } from "../../typings/exchanges";

type Props = {
	match: TMatch;
	matchType?: MatchType;
};

export const Match: React.FC<Props> = ({ match, matchType }) => {
	const { t } = useTranslationStore();
	const { setModal, confirm } = useModalStore();
	const status = getStatusFromMatch(match);
	const dateString = convertDateToReadableString(match.updated_at);
	const history = useHistory();

	const offerFields = fillFieldsWithSpecifications(
		SubmitOfferForm.fields,
		match.offer.specifications
	);
	const requestFields = fillFieldsWithSpecifications(
		RequestMatchCardFields.fields,
		match.request.specifications
	);

	console.log(match);

	const offerSpecs = createMatchSpecs(offerFields, requestFields);
	const requestSpecs = createMatchSpecs(requestFields, offerFields);

	const percentage = getMatchingPercentage(match.offer, requestFields, offerFields);
	const linkFilters = createQueryStringFromFilters(requestFields);

	const confirmCancel = () => {
		cancelMatch(match.id);
		confirm();
		location.reload();
	};

	const requestIsMine = match.request.is_mine;

	return (
		<div className="MatchCards">
			<h3>
				{t(status)} ({dateString})
			</h3>
			<div className="percentage">
				<span>{t("match")}</span>
				<Percentage matchPercentage={percentage} />
			</div>
			{matchType != MatchType.Admin && (
				<div className="cancel margin-10">
					<DangerButton
						label="cancel_match"
						handleClick={() =>
							setModal({ ...confirmCancelMatchModal, handleConfirm: confirmCancel })
						}
						classes={{ small: true }}
					/>
				</div>
			)}
			<div
				className={cx("cards", { admin: matchType == MatchType.Admin })}
				onClick={
					matchType != MatchType.Admin
						? () => history.push(`/app/offers/select/${match.offer.id}${linkFilters}`)
						: undefined
				}
			>
				<MatchCard
					matchType={requestIsMine ? MatchType.Requests : MatchType.Offers}
					mine={true}
					specs={requestIsMine ? requestSpecs : offerSpecs}
					user={requestIsMine ? match.request.user : match.offer.user}
					status={status}
				/>
				<MatchCard
					mine={false}
					matchType={requestIsMine ? MatchType.Offers : MatchType.Requests}
					specs={requestIsMine ? offerSpecs : requestSpecs}
					user={requestIsMine ? match.offer.user : match.request.user}
					status={status}
				/>
			</div>
		</div>
	);
};
