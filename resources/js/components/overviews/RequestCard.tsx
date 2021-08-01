import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Percentage } from "../base/Percentage";
import { SecondaryButton, Button, DangerButton } from "../base/Button";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";
import { AgeInPeriod } from "../match/AgeInPeriod";
import { TRequestCard, TSampleCard } from "../../typings/overviews";
import {
	getMatchClasses,
	createQueryStringFromFilters,
	fillFieldsWithKeyValuePairs,
	fillFieldsWithSpecifications
} from "../../utils/formatting/matches";
import { useHistory } from "react-router-dom";
import { SampleValue } from "../match/SampleValue";
import { FilterOffersForm } from "../../data/forms/ExchangeAttemptRequest";
import { createQueryStringFromSample } from "../../utils/formatting/samples";
import { deleteExchangeRequest } from "../../queries/deleteRequest";
import { useModalStore } from "../../hooks/useModalStore";
import { confirmDeleteModal } from "../../data/modals/confirm";
import { TExchangeAttempt } from "../../typings/exchanges";

type Props = {
	data?: any;
	index?: number;
};

export const RequestCard: React.FC<Props> = ({ data, index }) => {
	const { t } = useTranslationStore();
	const { filters, matchType, matches, magicField } = useExchangeAttemptStore();
	const history = useHistory();
	const queryString = createQueryStringFromFilters(filters);
	const selectMatch = rowIndex => {
		history.push(`/app/${matchType}s/select/${matches[rowIndex].id}${queryString}`);
	};

	const matchPercentage = data.find(column => column.id == "match_percentage");
	const classes = getMatchClasses(matchPercentage.value);
	const match = matches[index] as TExchangeAttempt;
	const fields = fillFieldsWithSpecifications(FilterOffersForm.fields, match.specifications);

	return (
		<div className="RequestCard Card" onClick={() => selectMatch(index)}>
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
								{magicField && column.id === "magic_cell"
									? t(magicField.id)
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

export const RequestDashboardCard: React.FC<{ data: any; sample: TExchangeAttempt }> = ({
	data,
	sample
}) => {
	const { t } = useTranslationStore();
	const { setModal, confirm } = useModalStore();
	const { deleteAttempt } = useExchangeAttemptStore();

	const fields = fillFieldsWithSpecifications(FilterOffersForm.fields, sample.specifications);
	const history = useHistory();

	const copy = () => {
		const queryString = createQueryStringFromSample(sample);
		history.push(`/app/submit-request${queryString}`);
	};

	const deleteRequestCallback = async () => {
		await deleteExchangeRequest(sample.id);
		deleteAttempt(sample.id);
		confirm();
	};

	return (
		<div className="RequestCard DashboardCard Card">
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
