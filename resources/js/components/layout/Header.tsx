import React from "react";
import { observer } from "mobx-react-lite";
import { LocalImage } from "../base/Image";
import { Menu } from "./Menu";

export const Header = observer(() => {
	return (
		<div className="Header">
			<div className="logo-wrapper">
				<LocalImage path="layout/logo-uu.png" />
				<LocalImage path="layout/logo-umc.png" />
			</div>
			<Menu />
		</div>
	);
});
