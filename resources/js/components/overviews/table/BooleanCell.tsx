import React from "react";
import { BooleanIcon } from "../../base/BooleanIcon";

type Props = {
	value: string;
};

export const BooleanCell: React.FC<Props> = ({ value }) => {
	return (
		<td className="BooleanCell">
			<BooleanIcon isTrue={!!value} />
		</td>
	);
};
