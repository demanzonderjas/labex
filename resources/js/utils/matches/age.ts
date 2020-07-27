import { getFieldById } from "../getters/fields";
import {
	DAY_IN_SECONDS,
	WEEK_IN_DAYS,
	MONTH_IN_DAYS,
	YEAR_IN_DAYS
} from "../../data/configs/datetime";

export function isAgeInRange(_, targetValue, filters) {
	const ageType = getFieldById("age_type", filters);
	const ageMin = getFieldById("age_min", filters);
	const ageMax = getFieldById("age_max", filters);
	if (!ageType.value) {
		return true;
	}
	const timePeriods = getTimeDiffInPeriods(targetValue);
	const givenFilter = timePeriods[ageType.value];
	return givenFilter >= ageMin.value && givenFilter <= ageMax.value;
}

export function getTimeDiffInPeriods(date) {
	const dateObj = new Date(date);
	const timeDiff = Date.now() - dateObj.getTime();
	const timePeriods = getTimePeriodsFromTimestamp(timeDiff);
	return timePeriods;
}

export function getTimePeriodsFromTimestamp(timestamp) {
	const days = timestamp / DAY_IN_SECONDS / 1000;
	const weeks = (days / WEEK_IN_DAYS) | 0;
	const months = (days / MONTH_IN_DAYS) | 0;
	const years = (days / YEAR_IN_DAYS) | 0;
	return { weeks, months, years };
}
