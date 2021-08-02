import React from "react";
import cx from "classnames";
import { getMatchClasses } from "../../utils/formatting/matches";

export function Percentage({ matchPercentage }) {
	const classes = getMatchClasses(matchPercentage);
	return (
		<span className={cx("Percentage", classes)}>
			<span className="number">{matchPercentage | 0}%</span>
			<span className="bar">
				<span className="completed" style={{ width: `${matchPercentage}%` }} />
			</span>
		</span>
	);
}
