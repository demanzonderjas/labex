import React from "react";
import { DisplayedAge } from "./Age";
import { FormField } from "../../typings/Form";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { DisplayedDate } from "../base/DisplayedDate";

type Props = {
	label: string;
	value: string;
	fields: FormField[];
};

export const SampleValue: React.FC<Props> = ({ value, label, fields }) => {
	const { t } = useTranslationStore();
	const isDate = label && label.indexOf("date") > -1;
	return (
		<>
			{(label == "age_offer" || label == "age_range") && (
				<DisplayedAge type={label} value={value} fields={fields} />
			)}
			{(isDate || label == "age") && <DisplayedDate value={value} />}
			{label != "age_offer" && label != "age_range" && label != "age" && !isDate && (
				<span>{value ? t(value) : "-"}</span>
			)}
		</>
	);
};
