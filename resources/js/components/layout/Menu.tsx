import React from "react";
import { observer } from "mobx-react";
import { menuItems, menuIcons } from "../../data/layout/menu";
import { LocalImage } from "../base/Image";
import { MenuItems } from "./MenuItems";

export const Menu = observer(() => {
	return (
		<div className="Menu">
			<div className="menu-wrapper">
				<MenuItems prefix="app" menuItems={menuItems} />
				<ul className="menu-icons">
					{menuIcons.map(icon => (
						<li key={icon}>
							<LocalImage path={`icons/${icon}.svg`} />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
});
