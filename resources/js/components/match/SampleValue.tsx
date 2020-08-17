import React from "react";
import { DisplayedAge } from "./Age";
import { FormField } from "../../typings/Form";
import { useTranslationStore } from "../../hooks/useTranslationStore";

type Props = {
	label: string;
	value: string;
	fields: FormField[];
};

export const SampleValue: React.FC<Props> = ({ value, label, fields }) => {
	const { t } = useTranslationStore();
	console.log(value, label);
	return (
		<>
			{label == "age_offer" ? (
				<DisplayedAge type={label} value={value} fields={fields} />
			) : (
				<span>{value ? t(value) : "-"}</span>
			)}
		</>
	);
};
