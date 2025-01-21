import React, { useState } from "react";
import { FormWrapper } from "../FormWrapper";
import { LoginUserForm } from "../../data/forms/User";
import { LocalImage } from "../base/Image";
import { SignUpForm } from "../../data/forms/SignUp";
import { useTranslationStore } from "../../hooks/useTranslationStore";
enum HomePageState {
	LOGIN,
	SIGN_UP,
}

export const LoginForm: React.FC = () => {
	const [page, setPage] = useState<HomePageState>(HomePageState.LOGIN);
	const { t } = useTranslationStore();
	const [showEmailVerification, setShowEmailVerification] = useState<boolean>(false);

	return (
		<div className="LoginForm">
			<div className="image" style={{ margin: "10px 0" }}>
				<LocalImage path="logo/labex.webp" />
			</div>

			{page == HomePageState.LOGIN && (
				<>
					<p>
						{t("dont_have_account")}
						<span className="link" onClick={() => setPage(HomePageState.SIGN_UP)}>
							&nbsp;{t("sign_up_here")}
						</span>
					</p>
					<FormWrapper
						form={LoginUserForm}
						handleSuccess={() => {
							console.log("success!");
							location.href = "/app/dashboard";
						}}
					/>
				</>
			)}
			{page == HomePageState.SIGN_UP && (
				<>
					<p>
						{t("already_have_account")}
						<span className="link" onClick={() => setPage(HomePageState.LOGIN)}>
							&nbsp;{t("log_in_here")}
						</span>
					</p>
					<FormWrapper
						form={SignUpForm}
						handleSuccess={() => setShowEmailVerification(true)}
					/>
					{!!showEmailVerification && (
						<p className="success-message">{t("check_email_verification_inbox")}</p>
					)}
				</>
			)}
		</div>
	);
};
