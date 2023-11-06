import React from "react";
import { DisplayedAge } from "./Age";
import { TFormField } from "../../typings/forms";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { DateAvailableValue, DisplayedDate } from "../base/DisplayedDate";
import { BooleanIcon } from "../base/BooleanIcon";
import { TExchangeAttempt } from "../../typings/exchanges";

type Props = {
	label: string;
	value: string;
	fields: TFormField[];
	attempt: TExchangeAttempt;
};

export const SampleValue: React.FC<Props> = ({ value, label, fields, attempt }) => {
	const { t } = useTranslationStore();
	const isDate = label && label.indexOf("date") > -1;
	const isOrgan = label && label.indexOf("organ") > -1;
	const isAmount = label && label.indexOf("amount") > -1;
	const isDateAvailable = label == "date_available" || label == "date_available_start";
	console.log(label, value, isAmount);

	return (
		<>
			{(label == "age_offer" || label == "age_range") && <DisplayedAge type={label} value={value} fields={fields} />}
			{label == "date_available" && <DateAvailableValue value={value} type={fields.find(f => f.id === "type")?.value} />}
			{((isDate && !isDateAvailable) || label == "age") && <DisplayedDate value={value} />}
			{label != "age_offer" &&
				label != "age_range" &&
				label != "age" &&
				label != "is_match" &&
				!isDateAvailable &&
				!isDate &&
				!isAmount &&
				!isOrgan && <span>{value ? t(value) : "-"}</span>}
			{!!isOrgan && value && (
				<span>
					{value
						.split(", ")
						.map(id => t(id))
						.join(", ")}
				</span>
			)}
			{label === "amount" && <span>{attempt?.remaining || value}</span>}
			{label === "amount_request" && <span>{value}</span>}
			{label === "is_match" && (
				<span style={{ marginLeft: "5px" }}>
					<BooleanIcon isTrue={!!value} />
				</span>
			)}
		</>
	);
};
