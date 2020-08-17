import { FormField } from "../../typings/Form";
import { fieldMeetsDependencies, fieldShouldBeIgnoredInMatch } from "../filters/fields";

export function getMatchingPercentage(sample, filters, fields) {
	const activeFilters = filters.filter(
		(filter: FormField) =>
			filter.value != "" &&
			!filter.hidden &&
			fieldMeetsDependencies(filter, 0, fields) &&
			!fieldShouldBeIgnoredInMatch(filter)
	);
	const matchingFilters = activeFilters.filter(filter =>
		checkIfFilterMatches(filter, sample, filters, fields)
	);
	return (matchingFilters.length / activeFilters.length) * 100;
}

export function checkIfFilterMatches(filter, field, filters, fields) {
	return filter.isMatch
		? filter.isMatch(filter.value, field[filter.id], filters, fields)
		: filter.value == field[filter.id];
}

export function checkIfFieldMatches(field, filter, filters, fields) {
	if (field.value === "") {
		return true;
	}
	return field.isMatch
		? field.isMatch(filter.value, field.value, filters, fields)
		: filter.value == field.value;
}
