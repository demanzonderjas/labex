import React from "react";
import { useTranslationStore } from "../../../hooks/useTranslationStore";
import { useSampleStore } from "../../../hooks/useSampleStore";
import { TExchangeRequestCard, TSampleCard } from "../../../typings/Overview";

type Props = {
	value: string;
	rowIndex: number;
	sample: TExchangeRequestCard;
};

export const AgeRangeCell: React.FC<Props> = ({ value, rowIndex, sample }) => {
	const { t } = useTranslationStore();
	const { matches } = useSampleStore();

	return (
		<td>
			{sample.age_min} - {sample.age_max} {t(sample.age_type)}
		</td>
	);
};
