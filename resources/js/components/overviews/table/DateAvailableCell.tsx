import React from "react";
import {
	convertDateToReadableString,
	getDatePlusTwoWeeks
} from "../../../utils/formatting/datetime";
import { DisplayedDate } from "../../base/DisplayedDate";
import { useSampleStore } from "../../../hooks/useSampleStore";
import { useTranslationStore } from "../../../hooks/useTranslationStore";

type Props = {
	value: string;
	rowIndex: number;
};

export const DateAvailableCell: React.FC<Props> = ({ value, rowIndex }) => {
	const datePlusTwoWeeks = getDatePlusTwoWeeks(value);
	const { matches } = useSampleStore();
	const { t } = useTranslationStore();
	const match = matches[rowIndex];

	if (match.type == "conserved_tissue") {
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
