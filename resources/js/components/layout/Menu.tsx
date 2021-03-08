import React from "react";
import { observer } from "mobx-react";
import { menuItems, menuIcons } from "../../data/layout/menu";
import { LocalImage } from "../base/Image";
import { MenuItems } from "./MenuItems";
import { useLocation } from "react-router";
import { PAGE_NAVBAR_COLOR } from "../../data/configs/colors";

export const Menu = observer(() => {
	const loc = useLocation();

	const navBarColor = PAGE_NAVBAR_COLOR[loc.pathname] || null;

	return (
		<div className="Menu" style={{ backgroundColor: navBarColor }}>
			<div className="menu-wrapper">
				<MenuItems prefix="app" menuItems={menuItems} />
				{/* <ul className="menu-icons">
					{menuIcons.map(icon => (
						<li key={icon}>
							<LocalImage path={`icons/${icon}.svg`} />
						</li>
					))}
				</ul> */}
			</div>
		</div>
	);
});
