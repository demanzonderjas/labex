import React from "react";
import { convertDateToReadableString } from "../../../utils/formatting/datetime";
import { getTimeDiffInPeriods } from "../../../utils/matches/age";
import { useTranslationStore } from "../../../hooks/useTranslationStore";
import { useExchangeAttemptStore } from "../../../hooks/useExchangeAttemptStore";
import { toJS } from "mobx";
import { TAgeType } from "../../../typings/specifications";

type Props = {
	value: string;
};

export const AgeCell: React.FC<Props> = ({ value }) => {
	const { t } = useTranslationStore();
	const { filters } = useExchangeAttemptStore();
	const timeDiff = getTimeDiffInPeriods(value);
	const ageType = filters.find(f => f.id == "age_type");
	const ageTypeValue = ageType ? ageType.value : TAgeType.Weeks;
	const periodTranslation =
		parseInt(timeDiff[ageTypeValue]) === 1
			? ageTypeValue.substr(0, ageTypeValue.length - 1)
			: ageTypeValue;
	const isZeroPeriods = timeDiff[ageTypeValue] === 0;

	return (
		<td>
			{isZeroPeriods ? "0-1" : timeDiff[ageTypeValue]} {t(periodTranslation)}
		</td>
	);
};
