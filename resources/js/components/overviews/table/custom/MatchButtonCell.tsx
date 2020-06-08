import React from "react";
import { useSampleStore } from "../../../../hooks/useSampleStore";
import { getMatchClasses } from "../../../../utils/formatting/matches";
import { ButtonCell } from "../ButtonCell";

export const MatchButtonCell = ({ value, rowIndex, ...props }) => {
	const { selectMatch } = useSampleStore();
	const classes = getMatchClasses(value);

	return (
		<ButtonCell
			{...props}
			label="select"
			classes={classes}
			handleClick={() => selectMatch(rowIndex)}
		/>
	);
};
