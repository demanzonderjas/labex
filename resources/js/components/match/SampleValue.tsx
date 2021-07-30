import React from "react";
import { DisplayedAge } from "./Age";
import { TFormField } from "../../typings/Form";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { DateAvailableValue, DisplayedDate } from "../base/DisplayedDate";
import { BooleanIcon } from "../base/BooleanIcon";

type Props = {
	label: string;
	value: string;
	fields: TFormField[];
};

export const SampleValue: React.FC<Props> = ({ value, label, fields }) => {
	const { t } = useTranslationStore();
	const isDate = label && label.indexOf("date") > -1;
	const isOrgan = label && label.indexOf("organ") > -1;
	const isDateAvailable = label == "date_available";
	return (
		<>
			{(label == "age_offer" || label == "age_range") && (
				<DisplayedAge type={label} value={value} fields={fields} />
			)}
			{label == "date_available" && (
				<DateAvailableValue value={value} type={fields.find(f => f.id === "type")?.value} />
			)}
			{((isDate && !isDateAvailable) || label == "age") && <DisplayedDate value={value} />}
			{label != "age_offer" &&
				label != "age_range" &&
				label != "age" &&
				label != "is_match" &&
				!isDateAvailable &&
				!isDate &&
				!isOrgan && <span>{value ? t(value) : "-"}</span>}
			{isOrgan && value && (
				<span>
					{value
						.split(", ")
						.map(id => t(id))
						.join(", ")}
				</span>
			)}
			{label === "is_match" && (
				<span style={{ marginLeft: "5px" }}>
					<BooleanIcon isTrue={!!value} />
				</span>
			)}
		</>
	);
};
