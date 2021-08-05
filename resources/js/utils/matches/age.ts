import { getFieldById } from "../getters/fields";
import {
	DAY_IN_SECONDS,
	WEEK_IN_DAYS,
	MONTH_IN_DAYS,
	YEAR_IN_DAYS
} from "../../data/configs/datetime";
import { TSpecStatus } from "../../typings/Sample";
import { TSpecificationName } from "../../typings/exchanges";

export function isAgeInRange(fieldValue, targetValue, filters, fields): TSpecStatus {
	const ageType =
		getFieldById(TSpecificationName.AgeType, filters) ||
		getFieldById(TSpecificationName.AgeType, fields);
	const ageMin =
		getFieldById(TSpecificationName.AgeMin, filters) ||
		getFieldById(TSpecificationName.AgeMin, fields);
	const ageMax =
		getFieldById(TSpecificationName.AgeMax, filters) ||
		getFieldById(TSpecificationName.AgeMax, fields);
	const realTarget = getFieldById(TSpecificationName.AgeType, filters) ? targetValue : fieldValue;
	if (!ageType.value) {
		return TSpecStatus.Match;
	}
	const timePeriods = getTimeDiffInPeriods(realTarget);
	const givenFilter = timePeriods[ageType.value];
	return givenFilter >= ageMin.value && givenFilter <= ageMax.value
		? TSpecStatus.Match
		: TSpecStatus.NoMatch;
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

export function isAgeRangeMatching(_, targetValue, filters, fields): TSpecStatus {
	const ageTypeSpec = getFieldById(TSpecificationName.AgeType, fields);
	const dayMultiplierSpec = getDayMultiplier(ageTypeSpec?.value);
	const ageMinSpec = getFieldById(TSpecificationName.AgeMin, fields);
	const ageMinSpecInDays = parseInt(ageMinSpec?.value) * dayMultiplierSpec;
	const ageMaxSpec = getFieldById(TSpecificationName.AgeMax, fields);
	const ageMaxSpecInDays = parseInt(ageMaxSpec?.value) * dayMultiplierSpec;

	const ageTypeFilter = getFieldById(TSpecificationName.AgeType, filters);
	const dayMultiplierFilter = getDayMultiplier(ageTypeFilter.value);
	const ageMinFilter = getFieldById(TSpecificationName.AgeMin, filters);
	const ageMinFilterInDays = parseInt(ageMinFilter.value) * dayMultiplierFilter;
	const ageMaxFilter = getFieldById(TSpecificationName.AgeMax, filters);
	const ageMaxFilterInDays = parseInt(ageMaxFilter.value) * dayMultiplierFilter;

	return (ageMinFilterInDays > ageMinSpecInDays && ageMinFilterInDays < ageMaxSpecInDays) ||
		(ageMinFilterInDays < ageMinSpecInDays && ageMaxFilterInDays > ageMaxSpecInDays) ||
		(ageMinSpecInDays > ageMinFilterInDays && ageMaxSpecInDays < ageMaxFilterInDays) ||
		(ageMaxFilterInDays < ageMaxSpecInDays &&
			ageMinFilterInDays < ageMaxSpecInDays &&
			ageMaxFilterInDays > ageMinSpecInDays)
		? TSpecStatus.Match
		: TSpecStatus.NoMatch;
}
