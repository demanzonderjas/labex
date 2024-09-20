import React, { useState } from "react";
import { LoginState } from "./LoginState";
import { SignUpState } from "./SignupState";
import { FormWrapper } from "../FormWrapper";
import { LoginUserForm } from "../../data/forms/User";
import { LocalImage } from "../base/Image";
enum HomePageState {
	LOGIN,
	SIGN_UP,
}

export const LoginForm: React.FC = () => {
	const [page, setPage] = useState<HomePageState>(HomePageState.LOGIN);

	return (
		<div className="LoginForm">
			<div className="image" style={{ margin: "10px 0" }}>
				<LocalImage path="logo/labex.png" />
			</div>
			<FormWrapper
				form={LoginUserForm}
				handleSuccess={() => (location.href = "/app/dashboard")}
			/>
		</div>
	);

	return (
		<div className="LoginForm">
			{page == HomePageState.LOGIN && (
				<LoginState switchPage={() => setPage(HomePageState.SIGN_UP)} />
			)}
			{page == HomePageState.SIGN_UP && (
				<SignUpState switchPage={() => setPage(HomePageState.LOGIN)} />
			)}
		</div>
	);
};
