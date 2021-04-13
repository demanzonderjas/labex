import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Percentage } from "../base/Percentage";
import { SecondaryButton, Button, DangerButton } from "../base/Button";
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
import { deleteExchangeRequest } from "../../queries/deleteRequest";
import { useModalStore } from "../../hooks/useModalStore";
import { confirmDeleteModal } from "../../data/modals/confirm";

type Props = {
	data?: any;
	index?: number;
};

export const ExchangeRequestCard: React.FC<Props> = ({ data, index }) => {
	const { t } = useTranslationStore();
	const { filters, matchType, matches, magicRequestField } = useSampleStore();
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
					.filter(column => !!column && column.id != "match_percentage")
					.map(column => (
						<div key={column.id} className="info-block">
							<label>
								{magicRequestField && column.id === "magic_cell"
									? t(magicRequestField.id)
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

export const ExchangeRequestDashboardCard: React.FC<{ data: any; sample: TSampleCard }> = ({
	data,
	sample
}) => {
	const { t } = useTranslationStore();
	const { setModal, confirm } = useModalStore();
	const { deleteRequest } = useSampleStore();

	const fields = fillFieldsWithKeyValuePairs(FilterOffersForm.fields, sample);
	const history = useHistory();

	const copy = () => {
		const queryString = createQueryStringFromSample(sample);
		history.push(`/app/submit-request${queryString}`);
	};

	const deleteRequestCallback = async () => {
		await deleteExchangeRequest(sample.id);
		deleteRequest(sample.id);
		confirm();
	};

	return (
		<div className="ExchangeRequestCard DashboardCard Card">
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
			<div className="button-spacer">
				<Button classes={{ small: true, primary: true }} label="copy" handleClick={copy} />
				{!sample?.is_match && (
					<DangerButton
						classes={{ small: true }}
						label="delete"
						handleClick={() =>
							setModal({
								...confirmDeleteModal,
								handleConfirm: deleteRequestCallback
							})
						}
					/>
				)}
			</div>
		</div>
	);
};
