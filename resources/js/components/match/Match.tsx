import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { TMatch } from "../../typings/Overview";
import { getStatusFromMatch } from "../../utils/matches/status";
import { convertDateToReadableString } from "../../utils/formatting/datetime";
import { getMatchingPercentage } from "../../utils/matches/utils";
import { fillFieldsWithKeyValuePairs, createMatchSpecs } from "../../utils/formatting/matches";
import { ExchangeOffer } from "../../data/forms/ExchangeOffer";
import { ExchangeRequestSpecs, ExchangeRequest } from "../../data/forms/ExchangeRequest";
import { Percentage } from "../base/Percentage";

type Props = {
	match: TMatch;
};

export const Match: React.FC<Props> = ({ match }) => {
	const { t } = useTranslationStore();
	const status = getStatusFromMatch(match);
	const dateString = convertDateToReadableString(match.updated_at);

	const offerFields = fillFieldsWithKeyValuePairs(ExchangeOffer.fields, match.exchange_offer);
	const requestFields = fillFieldsWithKeyValuePairs(
		ExchangeRequest.fields,
		match.exchange_request
	);
	const specs = createMatchSpecs(offerFields, requestFields);
	const percentage = getMatchingPercentage(match.exchange_offer, requestFields, offerFields);

	console.log(specs, percentage);

	return (
		<div className="Match">
			<h3>
				{t(status)} ({dateString})
			</h3>
			<div className="percentage">
				<span>{t("match")}</span>
				<Percentage matchPercentage={percentage} />
			</div>
			<div className="cards"></div>
		</div>
	);
};
