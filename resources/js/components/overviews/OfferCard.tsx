import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Percentage } from "../base/Percentage";
import { Button, DangerButton } from "../base/Button";
import { useSampleStore } from "../../hooks/useSampleStore";
import {
	getMatchClasses,
	createQueryStringFromFilters,
	fillFieldsWithKeyValuePairs,
	fillFieldsWithSpecifications
} from "../../utils/formatting/matches";
import { useHistory } from "react-router-dom";
import { SubmitOfferForm } from "../../data/forms/ExchangeAttemptOffer";
import { TOfferCard, TSampleCard } from "../../typings/overviews";
import { SampleValue } from "../match/SampleValue";
import { createQueryStringFromSample } from "../../utils/formatting/samples";
import { useModalStore } from "../../hooks/useModalStore";
import { deleteExchangeOffer } from "../../queries/deleteOffer";
import { confirmDeleteModal } from "../../data/modals/confirm";
import { TExchangeAttempt } from "../../typings/exchanges";

type Props = {
	data?: any;
	index?: number;
};

export const OfferCard: React.FC<Props> = ({ data, index }) => {
	const { t } = useTranslationStore();
	const { filters, matchType, matches, magicOfferField } = useSampleStore();
	const history = useHistory();
	const queryString = createQueryStringFromFilters(filters);
	const selectMatch = rowIndex => {
		history.push(`/app/${matchType}/select/${matches[rowIndex].id}${queryString}`);
	};

	const matchPercentage = data.find(column => column.id == "match_percentage");
	const classes = getMatchClasses(matchPercentage.value);
	const match = matches[index] as TOfferCard;
	const fields = fillFieldsWithKeyValuePairs(SubmitOfferForm.fields, match.specifications);

	return (
		<div className="OfferCard Card" onClick={() => selectMatch(index)}>
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

export const OfferDashboardCard: React.FC<{ data: any; attempt: TExchangeAttempt }> = ({
	data,
	attempt
}) => {
	const { t } = useTranslationStore();
	const { setModal, confirm } = useModalStore();
	const { deleteOffer } = useSampleStore();

	const fields = fillFieldsWithSpecifications(SubmitOfferForm.fields, attempt.specifications);
	const history = useHistory();

	const copy = () => {
		const queryString = createQueryStringFromSample(attempt);
		history.push(`/app/submit-offer${queryString}`);
	};

	const deleteOfferCallback = async () => {
		await deleteExchangeOffer(sample.id);
		deleteOffer(sample.id);
		confirm();
	};

	return (
		<div className="OfferCard DashboardCard Card">
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
			<div className="button-spacer">
				<Button classes={{ small: true, primary: true }} label="copy" handleClick={copy} />
				{!sample?.is_match && (
					<DangerButton
						classes={{ small: true }}
						label="delete"
						handleClick={() =>
							setModal({
								...confirmDeleteModal,
								handleConfirm: deleteOfferCallback
							})
						}
					/>
				)}
			</div>
		</div>
	);
};
