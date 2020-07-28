import React from "react";
import { getMatchClasses } from "../../../../utils/formatting/matches";
import { ButtonCell } from "../ButtonCell";

export const MatchButtonCell = ({ value, rowIndex, ...props }) => {
	const classes = getMatchClasses(value);

	return <ButtonCell {...props} label="select" classes={classes} />;
};
