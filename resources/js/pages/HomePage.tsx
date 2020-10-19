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
                <div className="info-steps layout-wrapper">
                    <h3>{t("match_steps")}</h3>
                    <p className="intro">{t("steps_intro")}</p>
                    <div className="steps">
                        <div className="step">
                            <span className="number">1</span>
                            <h4>{t("filter_existing")}</h4>
                            <p>{t("filter_existing_description")}</p>
                        </div>
                        <div className="step">
                            <span className="number">2</span>
                            <h4>{t("select_match_or_save")}</h4>
                            <p>{t("select_match_or_save_description")}</p>
                        </div>
                         <div className="step">
                            <span className="number">3</span>
                            <h4>{t("exchange_after_approval")}</h4>
                            <p>{t("exchange_after_approval_description")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}