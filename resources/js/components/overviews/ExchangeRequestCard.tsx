import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Percentage } from "../base/Percentage";
import { SecondaryButton, Button } from "../base/Button";
import { useSampleStore } from "../../hooks/useSampleStore";
import { AgeInPeriod } from "../match/AgeInPeriod";
import { TExchangeRequestCard, TSampleCard } from "../../typings/Overview";
import {
	getMatchClasses,
	createQueryStringFromFilters,
	fillFieldsWithKeyValuePairs
} from "../../utils/formatting/matches";
import { useHistory } from "react-router-dom";
import { SampleValue } from "../match/SampleValue";
import { FilterOffersForm } from "../../data/forms/ExchangeRequest";
import { createQueryStringFromSample } from "../../utils/formatting/samples";

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
	const fields = fillFieldsWithKeyValuePairs(FilterOffersForm.fields, match);

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

export const ExchangeRequestDashboardCard: React.FC<{ data: any; sample: TSampleCard }> = ({
	data,
	sample
}) => {
	const { t } = useTranslationStore();

	const fields = fillFieldsWithKeyValuePairs(FilterOffersForm.fields, sample);
	const history = useHistory();

	const copy = () => {
		const queryString = createQueryStringFromSample(sample);
		history.push(`/app/submit-request${queryString}`);
	};

	return (
		<div className="ExchangeRequestCard DashboardCard Card" onClick={copy}>
			<div className="details">
				{data.map(column => (
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
			<Button classes={{ small: true, primary: true }} label="copy" />
		</div>
	);
};
