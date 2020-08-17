import { getFieldById } from "../getters/fields";
import {
	DAY_IN_SECONDS,
	WEEK_IN_DAYS,
	MONTH_IN_DAYS,
	YEAR_IN_DAYS
} from "../../data/configs/datetime";

export function isAgeInRange(fieldValue, targetValue, filters, fields) {
	const ageType = getFieldById("age_type", filters) || getFieldById("age_type", fields);
	const ageMin = getFieldById("age_min", filters) || getFieldById("age_min", fields);
	const ageMax = getFieldById("age_max", filters) || getFieldById("age_max", fields);
	const realTarget = getFieldById("age_type", filters) ? targetValue : fieldValue;
	if (!ageType.value) {
		return true;
	}
	const timePeriods = getTimeDiffInPeriods(realTarget);
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

export function getDayMultiplier(type) {
	if (type == "weeks") {
		return WEEK_IN_DAYS;
	} else if (type == "months") {
		return MONTH_IN_DAYS;
	} else if (type == "years") {
		return YEAR_IN_DAYS;
	}
}

export function isAgeRangeMatching(_, targetValue, filters, fields) {
	const ageTypeSpec = getFieldById("age_type", fields);
	const dayMultiplierSpec = getDayMultiplier(ageTypeSpec.value);
	const ageMinSpec = getFieldById("age_min", fields);
	const ageMinSpecInDays = parseInt(ageMinSpec.value) * dayMultiplierSpec;
	const ageMaxSpec = getFieldById("age_max", fields);
	const ageMaxSpecInDays = parseInt(ageMaxSpec.value) * dayMultiplierSpec;

	const ageTypeFilter = getFieldById("age_type", filters);
	const dayMultiplierFilter = getDayMultiplier(ageTypeFilter.value);
	const ageMinFilter = getFieldById("age_min", filters);
	const ageMinFilterInDays = parseInt(ageMinFilter.value) * dayMultiplierFilter;
	const ageMaxFilter = getFieldById("age_max", filters);
	const ageMaxFilterInDays = parseInt(ageMaxFilter.value) * dayMultiplierFilter;

	return (
		(ageMinFilterInDays > ageMinSpecInDays && ageMinFilterInDays < ageMaxSpecInDays) ||
		(ageMinFilterInDays < ageMinSpecInDays && ageMaxFilterInDays > ageMaxSpecInDays) ||
		(ageMinSpecInDays > ageMinFilterInDays && ageMaxSpecInDays < ageMaxFilterInDays) ||
		(ageMaxFilterInDays < ageMaxSpecInDays &&
			ageMinFilterInDays < ageMaxSpecInDays &&
			ageMaxFilterInDays > ageMinSpecInDays)
	);
}
