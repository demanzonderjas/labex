import React, { useState } from "react";
import { SignUpForm } from "../../data/forms/SignUp";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { FormWrapper } from "../FormWrapper";

export const SignUpState: React.FC<{ switchPage: Function; hideHeader?: boolean }> = ({
	switchPage,
	hideHeader
}) => {
	const { t } = useTranslationStore();
	const [success, setSuccess] = useState<boolean>(false);

	return (
		<div className="SignUp">
			{!hideHeader && (
				<>
					<h1>{t("sign_up")}</h1>
					<p>{t("signup_sso")}</p>
				</>
			)}
			<FormWrapper form={SignUpForm} handleSuccess={() => setSuccess(true)} />
			{success && <p className="success">{t("successful_signup")}</p>}
			<p>
				{t("already_have_account")}{" "}
				<a href="#" onClick={() => switchPage()}>
					{t("login")}
				</a>
			</p>
		</div>
	);
};
