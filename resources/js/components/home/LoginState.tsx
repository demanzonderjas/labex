import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { goTo } from "../../utils/routing/url";
import { Button } from "../base/Button"

export const LoginState: React.FC<{switchPage: Function}> = ({ switchPage }) => {
    const { t } = useTranslationStore();
    return (
        <>
            <h1>{t("platform_title")}</h1>
            <p>{t("login_sso")}</p>
            <Button label="login" handleClick={() => goTo("/app/dashboard")} />
            <p>
                {t("dont_have_account")} <a href="#" onClick={() => switchPage()}>{t("sign_up")}</a>
            </p>
        </>
    )
}