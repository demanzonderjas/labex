import React from "react";
import { AgeInPeriod } from "./AgeInPeriod";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { AgeRange } from "./AgeRange";
import { DisplayedDate } from "../base/DisplayedDate";

type Props = {
	type: string;
	value: string;
	fields: any;
};

export const DisplayedAge: React.FC<Props> = ({ type, value, fields }) => {
	switch (type) {
		case "age":
			return <AgeInPeriod value={value} />;
		case "age_range":
			return <AgeRange fields={fields} />;
		default:
			return <DisplayedDate value={value} />;
	}
};
