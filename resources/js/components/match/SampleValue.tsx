import React from "react";
import { TFormField } from "../../typings/forms";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { DateAvailableValue, DisplayedDate } from "../base/DisplayedDate";
import { BooleanIcon } from "../base/BooleanIcon";
import { UploadedImage } from "../base/Image";

type Props = {
	label: string;
	value: string;
	fields: TFormField[];
};

export const SampleValue: React.FC<Props> = ({ value, label, fields }) => {
	const { t } = useTranslationStore();
	const isDate = label && label.indexOf("date") > -1;
	const isDateAvailable = label == "date_available" || label == "date_available_start";

	if (label === "image" && value) {
		return (
			<span>
				<UploadedImage path={value} />
			</span>
		);
	}
	return (
		<>
			{label == "date_available" && (
				<DateAvailableValue
					value={value}
					type={fields.find((f) => f.id === "type")?.value}
				/>
			)}
			{((isDate && !isDateAvailable) || label == "age") && <DisplayedDate value={value} />}
			{label != "age_offer" &&
				label != "age_range" &&
				label != "age" &&
				label != "is_match" &&
				!isDateAvailable &&
				!isDate && <span>{value ? t(value) : "-"}</span>}
			{label === "is_match" && (
				<span style={{ marginLeft: "5px" }}>
					<BooleanIcon isTrue={!!value} />
				</span>
			)}
		</>
	);
};
