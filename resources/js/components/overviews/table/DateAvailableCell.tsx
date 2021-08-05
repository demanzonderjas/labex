import React from "react";
import { getDatePlusTwoWeeks } from "../../../utils/formatting/datetime";
import { DisplayedDate } from "../../base/DisplayedDate";
import { useTranslationStore } from "../../../hooks/useTranslationStore";
import { TTableCellProps } from "../../../typings/overviews";
import { TSpecificationName } from "../../../typings/exchanges";

export const DateAvailableCell: React.FC<TTableCellProps> = ({ value, attempt }) => {
	const datePlusTwoWeeks = getDatePlusTwoWeeks(value);

	const sampleType = attempt.specifications.find(
		spec => spec.key == TSpecificationName.ExchangeType
	)?.value;

	if (sampleType == "conserved_tissue") {
		return (
			<td className="DateCell">
				<DisplayedDate value={value} />
			</td>
		);
	}

	return (
		<td className="DateCell">
			<DisplayedDate value={value} />
			&nbsp;-&nbsp;
			<DisplayedDate value={datePlusTwoWeeks} />
		</td>
	);
};
