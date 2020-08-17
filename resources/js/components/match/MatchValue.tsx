import React from "react";
import cx from "classnames";
import { FormField } from "../../typings/Form";
import { SampleValue } from "./SampleValue";

type Props = {
	value: string;
	label: string;
	isMatch: boolean;
	specs: FormField[];
};

export const MatchValue: React.FC<Props> = ({ value, isMatch, label, specs }) => {
	return (
		<span
			className={cx("MatchValue", {
				correct: isMatch,
				danger: !isMatch
			})}
		>
			<SampleValue value={value} label={label} fields={specs} />
		</span>
	);
};
