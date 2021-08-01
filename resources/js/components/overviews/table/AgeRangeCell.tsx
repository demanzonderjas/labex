import React from "react";
import { useTranslationStore } from "../../../hooks/useTranslationStore";
import { useExchangeAttemptStore } from "../../../hooks/useExchangeAttemptStore";
import { TRequestCard, TSampleCard } from "../../../typings/overviews";
import { TExchangeAttempt, TSpecificationName } from "../../../typings/exchanges";

type Props = {
	value: string;
	rowIndex: number;
	sample: any;
};

export const AgeRangeCell: React.FC<Props> = ({ value, rowIndex, sample }) => {
	const { t } = useTranslationStore();
	const { matches } = useExchangeAttemptStore();
	const match = matches[rowIndex] as TExchangeAttempt;
	const ageMinSpec = match.specifications.find(s => s.key === TSpecificationName.AgeMin);
	const ageMaxSpec = match.specifications.find(s => s.key === TSpecificationName.AgeMax);
	const ageTypeSpec = match.specifications.find(s => s.key === TSpecificationName.AgeType);
	const ageMin = ageMinSpec?.value;
	const ageMax = ageMaxSpec?.value;
	const ageType = ageTypeSpec?.value;

	return (
		<td>
			{ageMin} - {ageMax} {t(ageType)}
		</td>
	);
};
