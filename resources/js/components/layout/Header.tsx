import React from "react";
import { observer } from "mobx-react-lite";
import { LocalImage } from "../base/Image";
import { Menu } from "./Menu";
import { LogoWrapper } from "./LogoWrapper";
import { SubmitOfferButton } from "./SubmitOfferButton";
import { SubmitRequestButton } from "./SubmitRequestButton";

export const Header = observer(() => {
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
});
