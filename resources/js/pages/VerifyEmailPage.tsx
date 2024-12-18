import React, { useState } from "react";
import { Button } from "../components/base/Button";
import { LocalImage } from "../components/base/Image";
import { Footer } from "../components/layout/Footer";
import { HomePageHeader } from "../components/layout/Header";
import { PageIntro } from "../components/layout/PageIntro";
import { resendEmailVerification } from "../queries/createSignUp";
import { useTranslationStore } from "../hooks/useTranslationStore";

export const VerifyEmailPage: React.FC = () => {
	const [showEmailVerification, setShowEmailVerification] = useState<boolean>(false);
	const { t } = useTranslationStore();

	return (
		<div>
			<HomePageHeader />
			<div className="page-wrapper">
				<PageIntro header="verify_email" />
				<div className="layout-wrapper content ">
					<div style={{ margin: "40px 0", maxWidth: "200px" }}>
						<LocalImage path="logo/labex.webp" />
					</div>
					<p className="margin-20">
						<Button
							label="resend_email_verification_email"
							handleClick={async () => {
								await resendEmailVerification();
								setShowEmailVerification(true);
							}}
						/>
					</p>
					{!!showEmailVerification && (
						<p className="success-message">{t("check_email_verification_inbox")}</p>
					)}
					<Button
						label="go_to_dashboard"
						handleClick={() => (location.href = "/app/dashboard")}
					/>
				</div>
			</div>
			<Footer />
		</div>
	);
};
