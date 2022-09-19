import React from "react";
import { useHistory } from "react-router";
import { Button } from "../components/base/Button";
import { LocalImage } from "../components/base/Image";
import { FormWrapper } from "../components/FormWrapper";
import { Footer } from "../components/layout/Footer";
import { HomePageHeader } from "../components/layout/Header";
import { PageIntro } from "../components/layout/PageIntro";
import { LoginUserForm } from "../data/forms/User";

export const ExternalLoginPage: React.FC = () => {
	return (
		<div className="ExternalLoginPage">
			<HomePageHeader />
			<div className="page-wrapper">
				<PageIntro header="external_login" />
				<div className="layout-wrapper content ">
					<div style={{ margin: "40px 0" }}>
						<LocalImage path="logo/atex.png" />
					</div>
					<div className="LoginForm">
						<FormWrapper
							form={LoginUserForm}
							handleSuccess={() => (location.href = "/app/dashboard")}
						/>
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
