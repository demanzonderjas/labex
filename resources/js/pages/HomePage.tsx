import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../components/base/Button";
import { LoginForm } from "../components/home/LoginForm";
import { HomePageHeader } from "../components/layout/Header";
import { useTranslationStore } from "../hooks/useTranslationStore";

export const HomePage: React.FC = () => {
	const { t } = useTranslationStore();
	const history = useHistory();

	return (
		<div className="HomePage">
			<div className="bg">
				<div className="bg-color-2" />
			</div>
			<div className="layout-wrapper">
				<div className="column login">
					<HomePageHeader />
					<LoginForm />
				</div>
				<div className="column info">
					<div className="info-steps">
						<h3>{t("match_steps")}</h3>
						<div
							className="intro"
							dangerouslySetInnerHTML={{ __html: t("steps_intro") }}
						/>
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
					<div className="more-info">
						<Button label="more_info" handleClick={() => history.push("/about-us")} />
					</div>
				</div>
			</div>
		</div>
	);
};
