import React from "react";
import {
	convertDateToReadableString,
	getDatePlusTwoWeeks
} from "../../../utils/formatting/datetime";
import { DisplayedDate } from "../../base/DisplayedDate";
import { useSampleStore } from "../../../hooks/useSampleStore";
import { useTranslationStore } from "../../../hooks/useTranslationStore";
import { TSampleCard } from "../../../typings/Overview";

type Props = {
	value: string;
	rowIndex: number;
	sample: TSampleCard;
};

export const DateAvailableCell: React.FC<Props> = ({ value, sample }) => {
	const datePlusTwoWeeks = getDatePlusTwoWeeks(value);
	const { t } = useTranslationStore();

	if (sample.type == "conserved_tissue") {
		return <td className="DateCell">{t("always")}</td>;
	}

	return (
		<td className="DateCell">
			<DisplayedDate value={value} />
			&nbsp;-&nbsp;
			<DisplayedDate value={datePlusTwoWeeks} />
		</td>
	);
};
