import React from "react";
import { observer } from "mobx-react-lite";
import { LocalImage } from "../base/Image";
import { Menu } from "./Menu";
import { LogoWrapper } from "./LogoWrapper";

export const Header = observer(() => {
	return (
		<header>
			<LogoWrapper />
			<Menu />
		</header>
	);
});
