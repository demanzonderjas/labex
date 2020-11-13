import React from "react";
import { Menu } from "./Menu";
import { LogoWrapper } from "./LogoWrapper";
import { SubmitOfferButton } from "./SubmitOfferButton";
import { SubmitRequestButton } from "./SubmitRequestButton";
import { useHistory } from "react-router-dom";
import { Button } from "../base/Button";

export const Header = () => {
	const history = useHistory();
	return (
		<header>
			<div className="layout-wrapper">
				<LogoWrapper />
				<div className="buttons">
					<SubmitRequestButton />
					<SubmitOfferButton />
					<Button
						classes={{ small: true, inline: true, danger: true }}
						label="log_out"
						handleClick={() => (location.href = "/logout")}
					/>
				</div>
			</div>
			<Menu />
		</header>
	);
};

export const HomePageHeader: React.FC = () => {
	return (
		<header>
			<div className="layout-wrapper">
				<LogoWrapper />
			</div>
		</header>
	);
};
