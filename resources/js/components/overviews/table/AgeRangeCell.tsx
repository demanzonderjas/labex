import React from "react";
import { useTranslationStore } from "../../../hooks/useTranslationStore";
import { TSpecificationName } from "../../../typings/exchanges";
import { TTableCellProps } from "../../../typings/overviews";

export const AgeRangeCell: React.FC<TTableCellProps> = ({ attempt }) => {
	const { t } = useTranslationStore();
	const ageMinSpec = attempt.specifications.find(s => s.key === TSpecificationName.AgeMin);
	const ageMaxSpec = attempt.specifications.find(s => s.key === TSpecificationName.AgeMax);
	const ageTypeSpec = attempt.specifications.find(s => s.key === TSpecificationName.AgeType);
	const ageMin = ageMinSpec?.value;
	const ageMax = ageMaxSpec?.value;
	const ageType = ageTypeSpec?.value;

	return (
		<td>
			{ageMin} - {ageMax} {t(ageType)}
		</td>
	);
};
