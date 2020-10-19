import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";

export const SignUpState: React.FC<{switchPage: Function}> = ({ switchPage }) => {
    const { t } = useTranslationStore();
    return (
        <>
            <h1>{t("sign_up")}</h1>
            <p>{t("signup_sso")}</p>
            
            <p>
                {t("already_have_account")} <a href="#" onClick={() => switchPage()}>{t("login")}</a>
            </p>
        </>
    )
}