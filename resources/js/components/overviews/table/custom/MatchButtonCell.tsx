import React from "react";
import { useSampleStore } from "../../../../hooks/useSampleStore";
import {
	getMatchClasses,
	createQueryStringFromFilters
} from "../../../../utils/formatting/matches";
import { ButtonCell } from "../ButtonCell";
import { useHistory } from "react-router-dom";

export const MatchButtonCell = ({ value, rowIndex, ...props }) => {
	const { selectMatch, matches, filters } = useSampleStore();
	const history = useHistory();
	const classes = getMatchClasses(value);
	const queryString = createQueryStringFromFilters(filters);

	return (
		<ButtonCell
			{...props}
			label="select"
			classes={classes}
			handleClick={() => {
				history.push(`/app/offers/select/${matches[rowIndex].id}${queryString}`);
			}}
		/>
	);
};
