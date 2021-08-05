import React from "react";
import { TTableCellProps } from "../../../../typings/overviews";
import { getMatchClasses } from "../../../../utils/formatting/matches";
import { ButtonCell } from "../ButtonCell";

export const MatchButtonCell: React.FC<TTableCellProps> = ({
	value,
	rowIndex,
	attempt,
	...props
}) => {
	const classes = getMatchClasses(attempt.match_percentage);
	console.log(attempt);

	return <ButtonCell {...props} label="select" classes={classes} />;
};
