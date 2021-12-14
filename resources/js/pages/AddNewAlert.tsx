import React from "react";
import { useHistory } from "react-router";
import { FormWrapper } from "../components/FormWrapper";
import { PageIntro } from "../components/layout/PageIntro";
import { AddNewAlertForm } from "../data/forms/Alert";
import { useTranslationStore } from "../hooks/useTranslationStore";

export const AddNewAlertPage: React.FC = () => {
	const { push } = useHistory();
	const { t } = useTranslationStore();
	return (
		<div className="AddNewAlert">
			<PageIntro header="add_new_alert">
				<div dangerouslySetInnerHTML={{ __html: t("add_new_alert_description") }} />
			</PageIntro>
			<div className="layout-wrapper" style={{ margin: "20px auto" }}>
				<FormWrapper form={AddNewAlertForm} handleSuccess={() => push("/app/alerts")} />
			</div>
		</div>
	);
};
