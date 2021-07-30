import React from "react";
import { useTranslationStore } from "../../../hooks/useTranslationStore";
import { useExchangeAttemptStore } from "../../../hooks/useExchangeAttemptStore";
import { TRequestCard, TSampleCard } from "../../../typings/overviews";
import { TExchangeAttempt } from "../../../typings/exchanges";

type Props = {
	value: string;
	rowIndex: number;
	sample: any;
};

export const AgeRangeCell: React.FC<Props> = ({ value, rowIndex, sample }) => {
	const { t } = useTranslationStore();
	const { matches } = useExchangeAttemptStore();
	const match = matches[rowIndex] as any;
	const ageMin = sample.age_min || (match && match.age_min);
	const ageMax = sample.age_max || (match && match.age_max);
	const ageType = sample.age_type || (match && match.age_type);

	return (
		<td>
			{ageMin} - {ageMax} {t(ageType)}
		</td>
	);
};
