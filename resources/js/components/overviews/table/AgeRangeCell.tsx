import React from "react";
import { useTranslationStore } from "../../../hooks/useTranslationStore";
import { useSampleStore } from "../../../hooks/useSampleStore";
import { TRequestCard, TSampleCard } from "../../../typings/overviews";

type Props = {
	value: string;
	rowIndex: number;
	sample: TRequestCard;
};

export const AgeRangeCell: React.FC<Props> = ({ value, rowIndex, sample }) => {
	const { t } = useTranslationStore();
	const { matches } = useSampleStore();
	const match = matches[rowIndex] as TRequestCard;
	const ageMin = sample.age_min || (match && match.age_min);
	const ageMax = sample.age_max || (match && match.age_max);
	const ageType = sample.age_type || (match && match.age_type);

	return (
		<td>
			{ageMin} - {ageMax} {t(ageType)}
		</td>
	);
};
