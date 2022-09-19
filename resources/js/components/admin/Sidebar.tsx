import React from "react";
import { adminMenuItems } from "../../data/layout/menu";
import { MenuItems } from "../layout/MenuItems";
import { LocalImage } from "../base/Image";

export const Sidebar: React.FC = () => {
	return (
		<div className="Sidebar">
			<div className="logo-wrapper">
				<LocalImage path="logo/uu.nl_logo.png" />
			</div>
			<MenuItems prefix="admin" menuItems={adminMenuItems} />
		</div>
	);
};
