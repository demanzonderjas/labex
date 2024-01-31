import React from "react";
import { useNavigate } from "react-router";
import { FormWrapper } from "../components/FormWrapper";
import { PageIntro } from "../components/layout/PageIntro";
import { AddNewAlertForm } from "../data/forms/Alert";
import { useTranslationStore } from "../hooks/useTranslationStore";

export const AddNewAlertPage: React.FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslationStore();
	return (
		<div className="AddNewAlert">
			<PageIntro header="add_new_alert">
				<div dangerouslySetInnerHTML={{ __html: t("add_new_alert_description") }} />
			</PageIntro>
			<div className="layout-wrapper" style={{ margin: "20px auto" }}>
				<FormWrapper form={AddNewAlertForm} handleSuccess={() => navigate("/app/alerts")} />
			</div>
		</div>
	);
};
