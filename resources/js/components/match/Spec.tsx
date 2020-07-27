import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { TSpecMatch } from "../../typings/Sample";
import { SpecMatch } from "../base/SpecMatch";
import { AgeInPeriod } from "./AgeInPeriod";
import { DisplayedAge } from "./Age";

type Props = {
	label: string;
	value: string;
	match: TSpecMatch;
	fields: any;
};

export const Spec: React.FC<Props> = ({ label, value, match, fields }) => {
	const { t } = useTranslationStore();

	return (
		<div className="Spec">
			<div className="column">
				<label>{t(label)}</label>
			</div>
			<div className="column">
				{label == "age" || label == "age_offer" ? (
					<DisplayedAge type={label} value={value} fields={fields} />
				) : (
					<span>{t(value)}</span>
				)}
			</div>
			<div className="column">
				<SpecMatch match={match} />
			</div>
		</div>
	);
};
