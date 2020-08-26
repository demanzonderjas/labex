import React from "react";
import { prefixWithZeroBelow9 } from "../../utils/formatting/datetime";

type Props = {
	value: string;
};

export const DisplayedDate: React.FC<Props> = ({ value }) => {
	const [year, month, day] = value.split("-");
	if (!year || !month || !day) {
		return <span>-</span>;
	}
	return (
		<div className="DisplayedDate inline">
			<span>{prefixWithZeroBelow9(day)}</span>
			<span>{prefixWithZeroBelow9(month)}</span>
			<span>{year}</span>
		</div>
	);
};
