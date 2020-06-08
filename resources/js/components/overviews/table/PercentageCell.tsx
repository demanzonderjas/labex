import React from "react";
import cx from "classnames";
import { getMatchClasses } from "../../../utils/formatting/matches";

type Props = {
	value: number;
};

export const PercentageCell: React.FC<Props> = ({ value }) => {
	const classes = getMatchClasses(value);
	return (
		<td className={cx("TableCell", classes)}>
			<span>{value}%</span>
		</td>
	);
};
