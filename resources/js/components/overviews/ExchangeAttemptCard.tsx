import { observer } from "mobx-react-lite";
import React from "react";
import { useHistory } from "react-router-dom";
import { SubmitOfferForm } from "../../data/forms/ExchangeAttemptOffer";
import { FilterOffersForm } from "../../data/forms/ExchangeAttemptRequest";
import { confirmDeleteModal } from "../../data/modals/confirm";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";
import { useModalStore } from "../../hooks/useModalStore";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { deleteAttemptQuery } from "../../queries/deleteAttempt";
import {
	TExchangeAttempt,
	TExchangeAttemptType,
	TSpecificationName
} from "../../typings/exchanges";
import { TOverviewType, TTableCell } from "../../typings/overviews";
import {
	createQueryStringFromFilters,
	fillFieldsWithSpecifications,
	getMatchClasses
} from "../../utils/formatting/matches";
import { createQueryStringFromSpecs } from "../../utils/formatting/samples";
import { Button, DangerButton } from "../base/Button";
import { Percentage } from "../base/Percentage";
import { SampleValue } from "../match/SampleValue";
import cx from "classnames";
import { goToSelectMatchLink } from "../../utils/matches/utils";
import { goToCopyLink, goToEditLink } from "../../utils/routing/url";

export const ExchangeAttemptCard: React.FC<{
	attempt: TExchangeAttempt;
	specsToShow: TTableCell[];
	type: TOverviewType;
}> = observer(({ attempt, specsToShow, type }) => {
	const { t } = useTranslationStore();
	const { setModal, confirm } = useModalStore();
	const { deleteAttempt, magicField, filters } = useExchangeAttemptStore();

	const targetFields =
		attempt.attempt_type === TExchangeAttemptType.Offer
			? SubmitOfferForm.fields
			: FilterOffersForm.fields;
	const fields = fillFieldsWithSpecifications(targetFields, attempt.specifications);
	const history = useHistory();
	const matchPercentage = specsToShow.find(s => s.id === TSpecificationName.MatchPercentage)
		?.value;
	const classes = getMatchClasses(matchPercentage ? matchPercentage.value : 0);
	const isGenericCard = type === TOverviewType.Cards;

	const deleteCallback = async () => {
		await deleteAttemptQuery(attempt.id);
		deleteAttempt(attempt.id);
		confirm();
	};

	return (
		<div
			className={cx("OfferCard Card", { DashboardCard: !isGenericCard })}
			onClick={
				isGenericCard ? () => goToSelectMatchLink(history, attempt, filters) : undefined
			}
		>
			{isGenericCard && (
				<div className="match">
					<div className="info-block">
						<label>{t("match_percentage")}</label>
						<Percentage matchPercentage={matchPercentage} />
					</div>
					<Button classes={{ ...classes, small: true }} label="select" />
				</div>
			)}
			<div className="details">
				{specsToShow
					.filter(
						column =>
							!!column &&
							column.id != "match_percentage" &&
							!column.id.match("button")
					)
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
			{!isGenericCard && (
				<div className="button-spacer">
					<Button
						classes={{ small: true, primary: true }}
						label="edit"
						handleClick={() => goToEditLink(history, attempt)}
					/>
					<Button
						classes={{ small: true, primary: true }}
						label="copy"
						handleClick={() => goToCopyLink(history, attempt)}
					/>
					{!attempt?.is_match && (
						<DangerButton
							classes={{ small: true }}
							label="delete"
							handleClick={() =>
								setModal({
									...confirmDeleteModal,
									handleConfirm: deleteCallback
								})
							}
						/>
					)}
				</div>
			)}
		</div>
	);
});
