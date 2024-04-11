import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { goTo } from "../../utils/routing/url";
import { Button } from "../base/Button";
import { LocalImage } from "../base/Image";
import { passwordModal } from "../../data/modals/passwordModal";
import { useModalStore } from "../../hooks/useModalStore";
import { demoLogin } from "../../queries/admin/users";

export const LoginState: React.FC<{ switchPage: Function }> = ({ switchPage }) => {
	const { t } = useTranslationStore();
	const { setModal } = useModalStore();

	const getRedirectUrl = () => {
		const params = new URLSearchParams(location.search);
		return params.get("target_url") ? encodeURIComponent(params.get("target_url")) : "";
	};

	const enterPassword = async (user_id: number) => {
		const password = prompt("Enter the password to enter the demo-environment:");
		const response = await demoLogin(password, user_id);
		if (response.success) {
			location.href = "/app/dashboard";
		} else {
			alert("That password is not correct.");
		}
	};

	return (
		<>
			{/* <h1>{t("platform_title")}</h1> */}
			<div style={{ height: "150px", width: "100%" }}>
				<LocalImage path="logo/labex.jpg" />
			</div>
			{/* <p>{t("login_sso")}</p> */}
			{/* <Button label="login_sso" handleClick={() => goTo("/login/surfconext")} /> */}
			<Button label="login_as_request_demo" handleClick={() => enterPassword(1)} />
			<Button label="login_as_offer_demo" handleClick={() => enterPassword(2)} />
			<p>
				{t("dont_have_account")}{" "}
				<a href="#" onClick={() => switchPage()}>
					{t("sign_up")}
				</a>
			</p>
		</>
	);
};
