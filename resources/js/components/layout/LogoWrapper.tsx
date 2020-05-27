import React from "react";
import { LocalImage } from "../base/Image";

export function LogoWrapper() {
	return (
		<div className="LogoWrapper">
			<LocalImage path="layout/logo-uu.png" />
			<LocalImage path="layout/logo-umc.png" />
		</div>
	);
}
