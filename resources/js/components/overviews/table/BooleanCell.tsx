import React from "react";
import { BooleanIcon } from "../../base/BooleanIcon";

type Props = {
	value: string | number | boolean;
};

export const BooleanCell: React.FC<Props> = ({ value }) => {
	const isTrue = value === "yes" || value === true || value === 1;
	return (
		<td className="BooleanCell">
			<BooleanIcon isTrue={!!isTrue} />
		</td>
	);
};
