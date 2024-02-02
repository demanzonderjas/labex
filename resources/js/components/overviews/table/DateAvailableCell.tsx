import React from "react";
import { DisplayedDate } from "../../base/DisplayedDate";
import { TTableCellProps } from "../../../typings/overviews";
import { TSpecificationName } from "../../../typings/exchanges";

export const DateAvailableCell: React.FC<TTableCellProps> = ({ value, attempt }) => {
	const sampleType = attempt.specifications.find(
		(spec) => spec.key == TSpecificationName.ExchangeType
	)?.value;

	const dateAvailableStart = attempt.specifications.find(
		(spec) => spec.key == TSpecificationName.DateAvailableStart
	)?.value;

	return (
		<td className="DateCell">
			{dateAvailableStart && (
				<>
					<DisplayedDate value={dateAvailableStart} />
					&nbsp;-&nbsp;
				</>
			)}

			<DisplayedDate value={value} />
		</td>
	);
};
