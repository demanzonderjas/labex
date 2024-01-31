import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormWrapper } from "../../components/FormWrapper";
import { EditFaqItemForm } from "../../data/forms/EditFaqItem";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { getFaqItem } from "../../queries/admin/getFaqItems";
import { fillFieldsWithKeyValuePairs } from "../../utils/formatting/matches";

type FaqEditParams = {
	id: string;
};

export const FAQEditPage = () => {
	const [item, setItem] = useState(null);
	const { t } = useTranslationStore();
	const { id } = useParams() as FaqEditParams;
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const response = await getFaqItem(id);
			const filledFields = fillFieldsWithKeyValuePairs(EditFaqItemForm.fields, response.item);
			EditFaqItemForm.fields = filledFields;
			setItem(response.item);
		})();
	}, []);

	if (!item) {
		return null;
	}

	return (
		<div className="FAQEditPage">
			<h1>{t("edit")}</h1>
			<FormWrapper form={EditFaqItemForm} handleSuccess={() => navigate("/admin/faq")} />
		</div>
	);
};
