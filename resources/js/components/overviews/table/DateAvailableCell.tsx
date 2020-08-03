import React from "react";
import {
	convertDateToReadableString,
	getDatePlusTwoWeeks
} from "../../../utils/formatting/datetime";
import { DisplayedDate } from "../../base/DisplayedDate";

type Props = {
	value: string;
};

export const DateAvailableCell: React.FC<Props> = ({ value }) => {
	const datePlusTwoWeeks = getDatePlusTwoWeeks(value);

	return (
		<td className="DateCell">
			<DisplayedDate value={value} />
			&nbsp;-&nbsp;
			<DisplayedDate value={datePlusTwoWeeks} />
		</td>
	);
};
