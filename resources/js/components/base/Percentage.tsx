import React from "react";
import cx from "classnames";
import { getMatchClasses } from "../../utils/formatting/matches";

export function Percentage({ matchPercentage }) {
	const classes = getMatchClasses(matchPercentage);
	return <span className={cx("Percentage", classes)}>{matchPercentage}%</span>;
}
