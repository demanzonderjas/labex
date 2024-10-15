import React from "react";
import { LocalImage } from "../base/Image";

export function LogoWrapper({ goTo = "" }) {
	return (
		<div className="LogoWrapper" onClick={() => (location.href = `/${goTo}`)}>
			<LocalImage path="layout/logo-uu.png" />
		</div>
	);
}
