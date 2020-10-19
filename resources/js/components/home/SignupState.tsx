import React from "react";
import { SignUpForm } from "../../data/forms/SignUp";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { FormWrapper } from "../FormWrapper";

export const SignUpState: React.FC<{switchPage: Function}> = ({ switchPage }) => {
    const { t } = useTranslationStore();
    return (
        <div className="SignUp">
            <h1>{t("sign_up")}</h1>
            <p>{t("signup_sso")}</p>
            <FormWrapper 
                form={SignUpForm}
            />
            <p>
                {t("already_have_account")} <a href="#" onClick={() => switchPage()}>{t("login")}</a>
            </p>
        </div>
    )
}