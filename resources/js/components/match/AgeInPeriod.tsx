import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { getTimeDiffInPeriods } from "../../utils/matches/age";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";

export const AgeInPeriod = ({ value }) => {
	const { t } = useTranslationStore();
	const { filters } = useExchangeAttemptStore();
	const timeDiff = getTimeDiffInPeriods(value);
	const ageType = filters.find(f => f.id == "age_type");
	const ageTypeValue = ageType ? ageType.value : "weeks";
	console.log("value", ageType);
	const periodTranslation =
		parseInt(timeDiff[ageTypeValue]) === 1
			? ageTypeValue.substr(0, ageTypeValue.length - 1)
			: ageTypeValue;

	return (
		<span>
			{timeDiff[ageTypeValue]} {t(periodTranslation)}
		</span>
	);
};
