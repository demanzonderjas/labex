import React from "react";
import { MenuItem } from "./MenuItem";

type Props = {
	prefix: string;
	menuItems: string[];
};

export const MenuItems: React.FC<Props> = ({ menuItems, prefix }) => {
	return (
		<ul className="menu-items">
			<div className="menu-wrapper">
				{menuItems.map(label => (
					<MenuItem key={label} prefix={prefix} label={label} isActive={false} />
				))}
			</div>
		</ul>
	);
};
