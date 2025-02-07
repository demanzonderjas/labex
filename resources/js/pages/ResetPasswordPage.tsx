import React, { useEffect, useState } from "react";
import { Button } from "../components/base/Button";
import { LocalImage } from "../components/base/Image";
import { Footer } from "../components/layout/Footer";
import { HomePageHeader } from "../components/layout/Header";
import { PageIntro } from "../components/layout/PageIntro";
import { resendEmailVerification } from "../queries/createSignUp";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { useUserStore } from "../hooks/useUserStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { FormWrapper } from "../components/FormWrapper";
import { ChangePasswordForm } from "../data/forms/ResetPassword";
import { changePassword } from "../queries/resetPassword";
import { useQuery } from "../hooks/useQuery";
import { ExternalAPI } from "../utils/api/axios";

export const ResetPasswordPage: React.FC = observer(() => {
	const [showSuccess, setShowSuccess] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<string>("");

	const { t } = useTranslationStore();
	const { token }: any = useParams();
	const { email }: any = useQuery();

	async function handlePasswordSubmit(data) {
		const response = await changePassword({ ...data, token, email });
		console.log(response);
		if (!response.success) {
			setPasswordError(response.message);
		} else {
			setShowSuccess(true);
		}
	}

	return (
		<div>
			<HomePageHeader />
			<div className="page-wrapper">
				<PageIntro header="reset_password">
					<p>{t("choose_new_password")}</p>
				</PageIntro>
				<div className="layout-wrapper content ">
					<div style={{ margin: "40px 0", maxWidth: "200px" }}>
						<LocalImage path="logo/labex.webp" />
					</div>
					<div style={{ maxWidth: "300px" }}>
						{!showSuccess && (
							<FormWrapper
								form={{
									...ChangePasswordForm,
									handler: handlePasswordSubmit,
								}}
								handleSuccess={() => setShowSuccess(true)}
							/>
						)}
						{!!passwordError && (
							<p className="error ErrorNotification">{passwordError}</p>
						)}
						{!!showSuccess && (
							<>
								<p className="success-message margin-10">
									{t("password_changed_successfully")}
								</p>
								<Button label="log_in" handleClick={() => (location.href = "/")} />
							</>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
});
