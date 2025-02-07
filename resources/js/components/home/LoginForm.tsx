import React, { useState } from "react";
import { FormWrapper } from "../FormWrapper";
import { LoginUserForm } from "../../data/forms/User";
import { LocalImage } from "../base/Image";
import { SignUpForm } from "../../data/forms/SignUp";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { ResetPasswordForm } from "../../data/forms/ResetPassword";
enum HomePageState {
	LOGIN,
	SIGN_UP,
	RESET_PASSWORD,
}

export const LoginForm: React.FC = () => {
	const [page, setPage] = useState<HomePageState>(HomePageState.LOGIN);
	const { t } = useTranslationStore();
	const [showEmailVerification, setShowEmailVerification] = useState<boolean>(false);
	const [showResetMailSent, setShowResetMailSent] = useState<boolean>(false);

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
							location.href = "/app/offers";
						}}
					/>
					<p>
						{t("forgot_password")}
						<span
							className="link"
							onClick={() => setPage(HomePageState.RESET_PASSWORD)}
						>
							&nbsp;{t("reset_password_here")}
						</span>
					</p>
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
						<>
							<p className="margin-10 success-message">
								{t("check_email_verification_inbox")}
							</p>
							<p>{t("verification_delay_description")}</p>
						</>
					)}
				</>
			)}
			{page === HomePageState.RESET_PASSWORD && (
				<>
					<p>
						<span className="link" onClick={() => setPage(HomePageState.LOGIN)}>
							&nbsp;{t("back_to_log_in")}
						</span>
					</p>
					<FormWrapper
						form={ResetPasswordForm}
						handleSuccess={() => setShowResetMailSent(true)}
					/>
					{!!showResetMailSent && (
						<>
							<p className="margin-10 success-message">
								{t("check_reset_password_mail")}
							</p>
						</>
					)}
				</>
			)}
		</div>
	);
};
