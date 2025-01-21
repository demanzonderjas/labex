import React from "react";
import { Menu } from "./Menu";
import { LogoWrapper } from "./LogoWrapper";
import { SubmitOfferButton } from "./SubmitOfferButton";
import { SubmitRequestButton } from "./SubmitRequestButton";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../base/Button";
import { LocalImage } from "../base/Image";

export const Header = () => {
	const navigate = useNavigate();
	return (
		<header>
			<div className="layout-wrapper">
				<LogoWrapper goTo="app/dashboard" />
				<div className="buttons">
					<SubmitOfferButton />
					<SubmitRequestButton />
					<Button
						label="alert_me"
						handleClick={() => navigate("/app/alerts")}
						classes={{ small: true, inline: true, tertiary: true }}
					/>
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
