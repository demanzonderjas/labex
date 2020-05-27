import React from "react";
import { LogoWrapper } from "../layout/LogoWrapper";
import { MenuItems } from "../layout/MenuItems";
import { adminMenuItems } from "../../data/layout/menu";

export function AdminHeader() {
	return (
		<header>
			<LogoWrapper />
			<div className="Menu">
				<MenuItems prefix="admin" menuItems={adminMenuItems} />
			</div>
		</header>
	);
}
