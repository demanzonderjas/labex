import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { adminMenuItems } from "../../data/layout/menu";
import { MenuItems } from "../layout/MenuItems";
import { LogoWrapper } from "../layout/LogoWrapper";
import { LocalImage } from "../base/Image";

export const Sidebar: React.FC = () => {
	const { t } = useTranslationStore();
	return (
		<div className="Sidebar">
			<div className="logo-wrapper">
				<LocalImage path="logo/universiteit-utrecht_logo.png" />
			</div>
			<MenuItems prefix="admin" menuItems={adminMenuItems} />
		</div>
	);
};
