import React from "react";
import cx from "classnames";

type Props = {
	value: number;
};

export const PercentageCell: React.FC<Props> = ({ value }) => {
	const classes = {
		correct: value >= 80,
		neutral: value < 80 && value >= 50,
		danger: value < 50
	};
	return (
		<td className={cx("TableCell", classes)}>
			<span>{value}%</span>
		</td>
	);
};
