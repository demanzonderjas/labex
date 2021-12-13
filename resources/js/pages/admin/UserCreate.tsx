import React from "react";
import { useHistory } from "react-router-dom";
import { FormWrapper } from "../../components/FormWrapper";
import { CreateUserForm } from "../../data/forms/User";
import { useTranslationStore } from "../../hooks/useTranslationStore";

export const UserCreatePage = () => {
	const { t } = useTranslationStore();
	const history = useHistory();

	return (
		<div className="UserCreatePage">
			<h1>{t("add_new_user")}</h1>
			<FormWrapper form={CreateUserForm} handleSuccess={() => history.push("/admin/users")} />
		</div>
	);
};
