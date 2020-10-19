import React from "react";
import { Button } from "../components/base/Button";
import { HomePageHeader } from "../components/layout/Header";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { goTo } from "../utils/routing/url";

export const HomePage: React.FC = () => {
    const { t } = useTranslationStore();
    
    return (
        <div className="HomePage">
            <div className="column login">
                <HomePageHeader />
                <div className="LoginForm layout-wrapper">
                    <h1>{t("platform_title")}</h1>
                    <p>{t("login_sso")}</p>
                    <Button label="login" handleClick={() => goTo("/app/dashboard")} />
                    <p>
                        {t("dont_have_account")} <a href="#">{t("sign_up")}</a>
                    </p>
                </div>
            </div>
            <div className="column info">

            </div>
        </div>
    )
}