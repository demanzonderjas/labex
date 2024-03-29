import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { goTo } from "../../utils/routing/url";
import { Button } from "../base/Button";
import { LocalImage } from "../base/Image";
import qs from "query-string";

export const LoginState: React.FC<{ switchPage: Function }> = ({ switchPage }) => {
	const { t } = useTranslationStore();

	const getRedirectUrl = () => {
		const params = new URLSearchParams(location.search);
		return params.get("target_url") ? encodeURIComponent(params.get("target_url")) : "";
	};

	return (
		<>
			{/* <h1>{t("platform_title")}</h1> */}
			<div style={{ height: "150px", width: "100%" }}>
				<LocalImage path="logo/labex.jpg" />
			</div>
			{/* <p>{t("login_sso")}</p> */}
			{/* <Button label="login_sso" handleClick={() => goTo("/login/surfconext")} /> */}
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
