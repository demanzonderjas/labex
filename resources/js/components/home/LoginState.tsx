import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { goTo } from "../../utils/routing/url";
import { Button } from "../base/Button";
import { LocalImage } from "../base/Image";

export const LoginState: React.FC<{ switchPage: Function }> = ({ switchPage }) => {
	const { t } = useTranslationStore();
	return (
		<>
			{/* <h1>{t("platform_title")}</h1> */}
			<div style={{ margin: "40px 0" }}>
				<LocalImage path="logo/atex.png" />
			</div>
			<p>{t("login_sso")}</p>
			<Button label="login_as_request_demo" handleClick={() => goTo("/test-request-login")} />
			<Button label="login_as_offer_demo" handleClick={() => goTo("/test-offer-login")} />
			<p>
				{t("dont_have_account")}{" "}
				<a href="#" onClick={() => switchPage()}>
					{t("sign_up")}
				</a>
			</p>
		</>
	);
};
