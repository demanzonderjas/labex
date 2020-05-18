import React from "react";
import { observer } from "mobx-react";
import { menuItems, menuIcons } from "../../data/layout/menu";
import { MenuItem } from "./MenuItem";
import { LocalImage } from "../base/Image";

export const Menu = observer(() => {
	return (
		<div className="Menu">
			<div className="menu-wrapper">
				<ul className="menu-items">
					{menuItems.map(label => (
						<MenuItem key={label} label={label} isActive={false} />
					))}
				</ul>
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
