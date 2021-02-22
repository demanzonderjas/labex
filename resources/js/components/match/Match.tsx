import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { TMatch, MatchType } from "../../typings/Overview";
import { getStatusFromMatch } from "../../utils/matches/status";
import { convertDateToReadableString } from "../../utils/formatting/datetime";
import { getMatchingPercentage } from "../../utils/matches/utils";
import {
	fillFieldsWithKeyValuePairs,
	createMatchSpecs,
	createQueryStringFromFilters
} from "../../utils/formatting/matches";
import { SubmitOfferForm } from "../../data/forms/ExchangeOffer";
import { RequestMatchCardFields } from "../../data/forms/ExchangeRequest";
import { Percentage } from "../base/Percentage";
import { MatchCard } from "./MatchCard";
import { useHistory } from "react-router-dom";
import cx from "classnames";

type Props = {
	match: TMatch;
	matchType?: MatchType;
};

export const Match: React.FC<Props> = ({ match, matchType }) => {
	const { t } = useTranslationStore();
	const status = getStatusFromMatch(match);
	const dateString = convertDateToReadableString(match.updated_at);
	const history = useHistory();

	const offerFields = fillFieldsWithKeyValuePairs(SubmitOfferForm.fields, match.exchange_offer);
	const requestFields = fillFieldsWithKeyValuePairs(
		RequestMatchCardFields.fields,
		match.exchange_request
	);

	const offerSpecs = createMatchSpecs(offerFields, requestFields);
	const requestSpecs = createMatchSpecs(requestFields, offerFields);

	const percentage = getMatchingPercentage(match.exchange_offer, requestFields, offerFields);
	const linkFilters = createQueryStringFromFilters(requestFields);

	const requestIsMine = match.exchange_request.is_mine;

	return (
		<div className="MatchCards">
			<h3>
				{t(status)} ({dateString})
			</h3>
			<div className="percentage">
				<span>{t("match")}</span>
				<Percentage matchPercentage={percentage} />
			</div>
			<div
				className={cx("cards", { admin: matchType == MatchType.Admin })}
				onClick={
					matchType != MatchType.Admin
						? () =>
								history.push(
									`/app/offers/select/${match.exchange_offer.id}${linkFilters}`
								)
						: undefined
				}
			>
				<MatchCard
					matchType={requestIsMine ? MatchType.Requests : MatchType.Offers}
					mine={true}
					specs={requestIsMine ? requestSpecs : offerSpecs}
					user={requestIsMine ? match.exchange_request.user : match.exchange_offer.user}
					status={status}
				/>
				<MatchCard
					mine={false}
					matchType={requestIsMine ? MatchType.Offers : MatchType.Requests}
					specs={requestIsMine ? offerSpecs : requestSpecs}
					user={requestIsMine ? match.exchange_offer.user : match.exchange_request.user}
					status={status}
				/>
			</div>
		</div>
	);
};
