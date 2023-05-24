import React from "react";
import { LocalImage } from "../base/Image";

export function LogoWrapper() {
	return (
		<div className="LogoWrapper">
			<LocalImage path="layout/logo-uu.png" />
			<LocalImage path="layout/logo-umc.png" />
			<LocalImage path="layout/radboudumc.png" />
			<LocalImage path="layout/radboud-universiteit.png" />
		</div>
	);
}
