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
import { ExchangeOffer } from "../../data/forms/ExchangeOffer";
import { ExchangeRequestMatchCard } from "../../data/forms/ExchangeRequest";
import { Percentage } from "../base/Percentage";
import { MatchCard } from "./MatchCard";
import { useHistory } from "react-router-dom";

type Props = {
	match: TMatch;
	matchType: MatchType;
};

export const Match: React.FC<Props> = ({ match, matchType }) => {
	const { t } = useTranslationStore();
	const status = getStatusFromMatch(match);
	const dateString = convertDateToReadableString(match.updated_at);
	const history = useHistory();

	const offerFields = fillFieldsWithKeyValuePairs(ExchangeOffer.fields, match.exchange_offer);
	const requestFields = fillFieldsWithKeyValuePairs(
		ExchangeRequestMatchCard.fields,
		match.exchange_request
	);

	const offerSpecs = createMatchSpecs(offerFields, requestFields);
	const requestSpecs = createMatchSpecs(requestFields, offerFields);

	const percentage = getMatchingPercentage(match.exchange_offer, requestFields, offerFields);
	const linkFilters = createQueryStringFromFilters(requestFields);

	const otherMatchType = matchType == MatchType.Requests ? MatchType.Offers : MatchType.Requests;

	return (
		<div className="Match">
			<h3>
				{t(status)} ({dateString})
			</h3>
			<div className="percentage">
				<span>{t("match")}</span>
				<Percentage matchPercentage={percentage} />
			</div>
			<div
				className="cards"
				onClick={() =>
					history.push(`/app/offers/select/${match.exchange_offer.id}${linkFilters}`)
				}
			>
				<MatchCard
					matchType={matchType}
					mine={true}
					specs={requestSpecs}
					user={match.exchange_request.user}
				/>
				<MatchCard
					mine={false}
					matchType={otherMatchType}
					specs={offerSpecs}
					user={match.exchange_offer.user}
					status={status}
				/>
			</div>
		</div>
	);
};
