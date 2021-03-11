import React from "react";
import {
	convertDateToReadableString,
	getDatePlusTwoWeeks
} from "../../../utils/formatting/datetime";
import { DisplayedDate } from "../../base/DisplayedDate";
import { useSampleStore } from "../../../hooks/useSampleStore";
import { useTranslationStore } from "../../../hooks/useTranslationStore";
import { TSampleCard } from "../../../typings/Overview";
import { FormFieldData } from "../../../typings/Form";

type Props = {
	value: string;
	rowIndex: number;
	sample: TSampleCard | FormFieldData[];
};

export const DateAvailableCell: React.FC<Props> = ({ value, sample }) => {
	const datePlusTwoWeeks = getDatePlusTwoWeeks(value);
	const { t } = useTranslationStore();

	const sampleType = Array.isArray(sample)
		? sample.find(field => field.id == "type")?.value
		: sample.type;

	console.log(sampleType);

	if (sampleType == "conserved_tissue") {
		return (
			<td className="DateCell">
				<DisplayedDate value={value} />
			</td>
		);
	}

	return (
		<td className="DateCell">
			<DisplayedDate value={value} />
			&nbsp;-&nbsp;
			<DisplayedDate value={datePlusTwoWeeks} />
		</td>
	);
};
