import React from "react";
import { BooleanIcon } from "../../base/BooleanIcon";

type Props = {
	value: string|boolean;
};

export const BooleanCell: React.FC<Props> = ({ value }) => {
	const isTrue = value === "yes" || value === true;
	return (
		<td className="BooleanCell">
			<BooleanIcon isTrue={!!isTrue} />
		</td>
	);
};
