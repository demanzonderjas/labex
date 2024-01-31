import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/base/Button";
import { FormWrapper } from "../../components/FormWrapper";
import { OfferAdoptionForm } from "../../data/forms/ExchangeAttemptOffer";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { getExchangeAttempt } from "../../queries/getExchangeAttempts";
import { fillFieldsWithKeyValuePairs } from "../../utils/formatting/matches";

type OfferAdoptionParams = {
	offer_id: string;
};

export const OfferAdoptionPage = () => {
	const [offer, setOffer] = useState(null);
	const { t } = useTranslationStore();
	const { offer_id } = useParams() as OfferAdoptionParams;
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const response = await getExchangeAttempt(offer_id);
			const filledFields = fillFieldsWithKeyValuePairs(
				OfferAdoptionForm.fields,
				response.exchange_attempt
			);
			OfferAdoptionForm.fields = filledFields;
			OfferAdoptionForm.data = response.exchange_attempt;
			setOffer(response.exchange_attempt);
		})();
	}, []);

	if (!offer) {
		return null;
	}

	return (
		<div className="ManageAdoption">
			<h1>{t("manage_adoption")}</h1>
			<Button
				label="go_back"
				handleClick={() => navigate(-1)}
				classes={{ tertiary: true, small: true, "margin-20": true }}
			/>
			<div style={{ maxWidth: "400px " }}>
				<FormWrapper
					form={OfferAdoptionForm}
					handleSuccess={() => navigate("/admin/offers")}
				/>
			</div>
		</div>
	);
};
