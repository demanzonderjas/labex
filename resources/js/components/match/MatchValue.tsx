import React from "react";
import cx from "classnames";
import { TFormField } from "../../typings/forms";
import { SampleValue } from "./SampleValue";
import { TSpecStatus } from "../../typings/specifications";

type Props = {
	value: string;
	label: string;
	matchStatus: TSpecStatus;
	specs: TFormField[];
	neutral: boolean;
};

export const MatchValue: React.FC<Props> = ({ value, matchStatus, label, specs, neutral }) => {
	return (
		<span
			className={cx("MatchValue", {
				correct: matchStatus == TSpecStatus.Match,
				danger: matchStatus == TSpecStatus.NoMatch,
				neutral
			})}
		>
			<SampleValue value={value} label={label} fields={specs} />
		</span>
	);
};
