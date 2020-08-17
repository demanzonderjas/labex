import React from "react";
import cx from "classnames";
import { FormField } from "../../typings/Form";
import { SampleValue } from "./SampleValue";
import { SpecStatus } from "../../typings/Sample";

type Props = {
	value: string;
	label: string;
	matchStatus: SpecStatus;
	specs: FormField[];
};

export const MatchValue: React.FC<Props> = ({ value, matchStatus, label, specs }) => {
	return (
		<span
			className={cx("MatchValue", {
				correct: matchStatus == SpecStatus.Match,
				danger: matchStatus == SpecStatus.NoMatch
			})}
		>
			<SampleValue value={value} label={label} fields={specs} />
		</span>
	);
};
