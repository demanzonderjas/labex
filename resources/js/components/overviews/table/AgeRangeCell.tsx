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
	console.log(sample, matches[rowIndex]);
	const match = matches[rowIndex] as TExchangeRequestCard;
	const ageMin = sample.age_min || (match && match.age_min);
	const ageMax = sample.age_max || (match && match.age_max);
	const ageType = sample.age_type || (match && match.age_type);

	return (
		<td>
			{ageMin} - {ageMax} {t(ageType)}
		</td>
	);
};
