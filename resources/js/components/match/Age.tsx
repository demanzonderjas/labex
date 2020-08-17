import React from "react";
import { AgeInPeriod } from "./AgeInPeriod";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { AgeRange } from "./AgeRange";

type Props = {
	type: string;
	value: string;
	fields: any;
};

export const DisplayedAge: React.FC<Props> = ({ type, value, fields }) => {
	const { t } = useTranslationStore();

	switch (type) {
		case "age":
			return <AgeInPeriod value={value} fields={fields} />;
		case "age_offer":
			return <AgeRange fields={fields} />;
		default:
			return <span>{t(value)}</span>;
	}
};
