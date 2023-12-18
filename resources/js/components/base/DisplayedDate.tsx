import React from "react";
import { getDatePlusTwoWeeks, prefixWithZeroBelow9 } from "../../utils/formatting/datetime";

type Props = {
	value: string;
};

export const DisplayedDate: React.FC<Props> = ({ value }) => {
	if (!value) {
		return <span>-</span>;
	}
	const [year, month, day] = value.split("-");
	if (!year || !month || !day) {
		return <span>-</span>;
	}
	return (
		<div className="DisplayedDate inline">
			<span>{prefixWithZeroBelow9(day.substring(0, 2))}</span>
			<span>{prefixWithZeroBelow9(month)}</span>
			<span>{year}</span>
		</div>
	);
};

export const DateAvailableValue: React.FC<Props & { type: string }> = ({ value, type }) => {
	const datePlusTwoWeeks = getDatePlusTwoWeeks(value);

	if (type == "conserved_tissue") {
		return <DisplayedDate value={value} />;
	}

	return (
		<>
			<DisplayedDate value={value} />
			&nbsp;-&nbsp;
			<DisplayedDate value={datePlusTwoWeeks} />
		</>
	);
};
