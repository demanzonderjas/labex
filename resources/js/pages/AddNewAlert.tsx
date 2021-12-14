import React from "react";
import { useHistory } from "react-router";
import { FormWrapper } from "../components/FormWrapper";
import { PageIntro } from "../components/layout/PageIntro";
import { AddNewAlertForm } from "../data/forms/Alert";

export const AddNewAlertPage: React.FC = () => {
	const { push } = useHistory();
	return (
		<div className="AddNewAlert">
			<PageIntro header="add_new_alert" />
			<div className="layout-wrapper" style={{ margin: "20px auto" }}>
				<FormWrapper form={AddNewAlertForm} handleSuccess={() => push("/app/alerts")} />
			</div>
		</div>
	);
};
