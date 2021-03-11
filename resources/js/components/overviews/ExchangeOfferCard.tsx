import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Percentage } from "../base/Percentage";
import { Button } from "../base/Button";
import { useSampleStore } from "../../hooks/useSampleStore";
import {
	getMatchClasses,
	createQueryStringFromFilters,
	fillFieldsWithKeyValuePairs
} from "../../utils/formatting/matches";
import { AgeInPeriod } from "../match/AgeInPeriod";
import { useHistory } from "react-router-dom";
import { SubmitOfferForm } from "../../data/forms/ExchangeOffer";
import { TExchangeOfferCard, TSampleCard } from "../../typings/Overview";
import { SampleValue } from "../match/SampleValue";
import { createQueryStringFromSample } from "../../utils/formatting/samples";

type Props = {
	data?: any;
	index?: number;
};

export const ExchangeOfferCard: React.FC<Props> = ({ data, index }) => {
	const { t } = useTranslationStore();
	const { filters, matchType, matches, magicOfferField } = useSampleStore();
	const history = useHistory();
	const queryString = createQueryStringFromFilters(filters);
	const selectMatch = rowIndex => {
		history.push(`/app/${matchType}/select/${matches[rowIndex].id}${queryString}`);
	};

	const matchPercentage = data.find(column => column.id == "match_percentage");
	const classes = getMatchClasses(matchPercentage.value);
	const match = matches[index] as TExchangeOfferCard;
	const fields = fillFieldsWithKeyValuePairs(SubmitOfferForm.fields, match);

	return (
		<div className="ExchangeOfferCard Card" onClick={() => selectMatch(index)}>
			<div className="match">
				<div className="info-block">
					<label>{t("match_percentage")}</label>
					<Percentage matchPercentage={matchPercentage.value} />
				</div>
				<Button classes={{ ...classes, small: true }} label="select" />
			</div>
			<div className="details">
				{data
					.filter(column => !!column && column.id != "match_percentage")
					.map(column => (
						<div key={column.id} className="info-block">
							<label>
								{magicOfferField && column.id === "magic_cell"
									? t(magicOfferField.id)
									: t(column.label || column.id)}
							</label>
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

export const ExchangeOfferDashboardCard: React.FC<{ data: any; sample: TSampleCard }> = ({
	data,
	sample
}) => {
	const { t } = useTranslationStore();

	const fields = fillFieldsWithKeyValuePairs(SubmitOfferForm.fields, sample);
	const history = useHistory();

	const copy = () => {
		const queryString = createQueryStringFromSample(sample);
		history.push(`/app/submit-offer${queryString}`);
	};

	return (
		<div className="ExchangeOfferCard DashboardCard Card" onClick={copy}>
			<div className="details">
				{data
					.filter(column => !!column)
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
			<Button classes={{ small: true, primary: true }} label="copy" />
		</div>
	);
};
