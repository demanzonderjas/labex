import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../components/base/Button";
import { SignUpState } from "../components/home/SignupState";
import { Footer } from "../components/layout/Footer";
import { HomePageHeader } from "../components/layout/Header";
import { PageIntro } from "../components/layout/PageIntro";
import { useTranslationStore } from "../hooks/useTranslationStore";

export const SignUpFirstPage: React.FC = () => {
	const { t } = useTranslationStore();
	const history = useHistory();

	return (
		<div className="SignUpFirstPage">
			<HomePageHeader />
			<div className="page-wrapper">
				<PageIntro header="signup_first"></PageIntro>
				<div className="layout-wrapper content ">
					<p className="margin-20" style={{ fontSize: "20px", lineHeight: "24px" }}>
						You do not have the right access level. Please sign up first to show that
						you are article 9 or article 13f2a qualified. Otherwise, contact the IvD
						Utrecht (<a href="mailto:info@atex.uu.nl">info@atex.uu.nl</a>).
					</p>
					<div className="LoginForm">
						<SignUpState switchPage={() => (location.href = "/")} hideHeader={true} />
					</div>
					<p className="margin-20">
						<Button
							label="back_to_homepage"
							handleClick={() => (location.href = "/")}
						/>
					</p>
				</div>
			</div>

			<Footer />
		</div>
	);
};
