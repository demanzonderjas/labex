import React from "react";
import {
	convertDateToReadableString,
	getDatePlusTwoWeeks
} from "../../../utils/formatting/datetime";
import { DisplayedDate } from "../../base/DisplayedDate";
import { useSampleStore } from "../../../hooks/useSampleStore";
import { useTranslationStore } from "../../../hooks/useTranslationStore";
import { TSampleCard } from "../../../typings/overviews";
import { TFormFieldData } from "../../../typings/Form";

type Props = {
	value: string;
	rowIndex: number;
	sample: TSampleCard | TFormFieldData[];
};

export const DateAvailableCell: React.FC<Props> = ({ value, sample }) => {
	const datePlusTwoWeeks = getDatePlusTwoWeeks(value);
	const { t } = useTranslationStore();

	const sampleType = Array.isArray(sample)
		? sample.find(field => field.id == "type")?.value
		: sample.type;

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
