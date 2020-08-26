import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Percentage } from "../base/Percentage";
import { SecondaryButton, Button } from "../base/Button";
import { useSampleStore } from "../../hooks/useSampleStore";
import { AgeInPeriod } from "../match/AgeInPeriod";
import { TExchangeRequestCard } from "../../typings/Overview";
import {
	getMatchClasses,
	createQueryStringFromFilters,
	fillFieldsWithKeyValuePairs
} from "../../utils/formatting/matches";
import { useHistory } from "react-router-dom";
import { SampleValue } from "../match/SampleValue";
import { ExchangeRequest } from "../../data/forms/ExchangeRequest";

type Props = {
	data?: any;
	index?: number;
};

export const ExchangeRequestCard: React.FC<Props> = ({ data, index }) => {
	const { t } = useTranslationStore();
	const { filters, matchType, matches } = useSampleStore();
	const history = useHistory();
	const queryString = createQueryStringFromFilters(filters);
	const selectMatch = rowIndex => {
		history.push(`/app/${matchType}/select/${matches[rowIndex].id}${queryString}`);
	};

	const matchPercentage = data.find(column => column.id == "match_percentage");
	const classes = getMatchClasses(matchPercentage.value);
	const match = matches[index] as TExchangeRequestCard;
	const fields = fillFieldsWithKeyValuePairs(ExchangeRequest.fields, match);

	return (
		<div className="ExchangeRequestCard Card" onClick={() => selectMatch(index)}>
			<div className="match">
				<div className="info-block">
					<label>{t("match_percentage")}</label>
					<Percentage matchPercentage={matchPercentage.value} />
				</div>
				<Button classes={{ ...classes, small: true }} label="select" />
			</div>
			<div className="details">
				{data
					.filter(column => column.id != "match_percentage")
					.map(column => (
						<div key={column.id} className="info-block">
							<label>{t(column.label || column.id)}</label>
							<SampleValue
								value={column.value}
								label={column.label || column.id}
								fields={fields}
							/>
						</div>
					))}
			</div>
		</div>
	);
};
