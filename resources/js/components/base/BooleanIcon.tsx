import React from "react";
import { Icon } from "./Image";

export const BooleanIcon: React.FC<{ isTrue: boolean }> = ({ isTrue }) => {
	return (
		<span className="icon-wrapper">
			<Icon name={isTrue ? "check" : "cross"} />
		</span>
	);
};
