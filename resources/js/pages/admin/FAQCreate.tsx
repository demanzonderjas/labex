import React from "react";
import { useNavigate } from "react-router-dom";
import { FormWrapper } from "../../components/FormWrapper";
import { CreateFaqItemForm } from "../../data/forms/EditFaqItem";
import { useTranslationStore } from "../../hooks/useTranslationStore";

export const FAQCreatePage = () => {
	const { t } = useTranslationStore();
	const navigate = useNavigate();

	return (
		<div className="FAQCreatePage">
			<h1>{t("create_faq_item")}</h1>
			<FormWrapper form={CreateFaqItemForm} handleSuccess={() => navigate("/admin/faq")} />
		</div>
	);
};
