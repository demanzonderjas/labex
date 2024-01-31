import React from "react";
import { useNavigate } from "react-router-dom";
import { FormWrapper } from "../../components/FormWrapper";
import { CreateUserForm } from "../../data/forms/User";
import { useTranslationStore } from "../../hooks/useTranslationStore";

export const UserCreatePage = () => {
	const { t } = useTranslationStore();
	const navigate = useNavigate();

	return (
		<div className="UserCreatePage">
			<h1>{t("add_new_user")}</h1>
			<FormWrapper form={CreateUserForm} handleSuccess={() => navigate("/admin/users")} />
		</div>
	);
};
