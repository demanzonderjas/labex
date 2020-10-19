import React, { useState } from "react";
import { LoginState } from "./LoginState";
import { SignUpState } from "./SignupState";
;

enum HomePageState { LOGIN, SIGN_UP };

export const LoginForm: React.FC = () => {
    const [page, setPage] = useState<HomePageState>(HomePageState.LOGIN);

    return (
        <div className="LoginForm layout-wrapper">
           {page == HomePageState.LOGIN && <LoginState switchPage={() => setPage(HomePageState.SIGN_UP)} />} 
           {page == HomePageState.SIGN_UP && <SignUpState switchPage={() => setPage(HomePageState.LOGIN)} />} 
        </div>
    )
}