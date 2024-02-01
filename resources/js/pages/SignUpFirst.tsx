import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/base/Button";
import { LocalImage } from "../components/base/Image";
import { SignUpState } from "../components/home/SignupState";
import { Footer } from "../components/layout/Footer";
import { HomePageHeader } from "../components/layout/Header";
import { PageIntro } from "../components/layout/PageIntro";
import { useTranslationStore } from "../hooks/useTranslationStore";

export const SignUpFirstPage: React.FC = () => {
	const { t } = useTranslationStore();
	const navigate = useNavigate();

	return (
		<div className="SignUpFirstPage">
			<HomePageHeader />
			<div className="page-wrapper">
				<PageIntro header="signup_first"></PageIntro>
				<div className="layout-wrapper content ">
					<div style={{ margin: "40px 0" }}>
						<LocalImage path="logo/atex.png" />
					</div>
					<p className="margin-20" style={{ fontSize: "20px", lineHeight: "24px" }}>
						You do not have the right access level. Please sign up first. Otherwise,
						contact LABEX (<a href="mailto:info@labex.uu.nl">info@labex.uu.nl</a>).
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
