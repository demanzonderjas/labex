import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";

export const AgeRange = ({ fields }) => {
	const { t } = useTranslationStore();
	const ageType = fields.find(f => f.id == "age_type");
	const ageMin = fields.find(f => f.id == "age_min");
	const ageMax = fields.find(f => f.id == "age_max");
	const ageTypeValue = ageType ? ageType.value : "weeks";

	return (
		<span>
			{ageMin.value} - {ageMax.value} {t(ageTypeValue)}
		</span>
	);
};
