import React from "react";
import cx from "classnames";
import { getMatchClasses } from "../../../utils/formatting/matches";
import { Percentage } from "../../base/Percentage";

type Props = {
	value: number;
};

export const PercentageCell: React.FC<Props> = ({ value }) => {
	return (
		<td className="TableCell">
			<Percentage matchPercentage={value} />
		</td>
	);
};
