import React from "react";
import { Menu } from "./Menu";
import { LogoWrapper } from "./LogoWrapper";
import { SubmitOfferButton } from "./SubmitOfferButton";
import { SubmitRequestButton } from "./SubmitRequestButton";

export const Header = () => {
	return (
		<header>
			<div className="layout-wrapper">
				<LogoWrapper />
				<div className="buttons">
					<SubmitRequestButton />
					<SubmitOfferButton />
				</div>
			</div>
			<Menu />
		</header>
	);
};

export const HomePageHeader:React.FC = () => {
	return (
		<header>
			<div className="layout-wrapper">
				<LogoWrapper />
			</div>
		</header>
	)
}
