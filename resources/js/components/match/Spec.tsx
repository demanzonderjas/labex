import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { TSpecMatch } from "../../typings/specifications";
import { SpecMatch } from "../base/SpecMatch";

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
				<span>{value ? t(value) : "-"}</span>
			</div>
			<div className="column">
				<SpecMatch match={match} />
			</div>
		</div>
	);
};
