import { FormField } from "../../typings/Form";
import { SpecStatus } from "../../typings/Sample";
import { fieldMeetsDependencies, fieldShouldBeIgnoredInMatch } from "../filters/fields";

export function getMatchingPercentage(sample, filters, fields) {
	const activeFilters = filters.filter(
		(filter: FormField) =>
			filter.value != "" &&
			!filter.hidden &&
			fieldMeetsDependencies(filter, 0, fields) &&
			!fieldShouldBeIgnoredInMatch(filter)
	);
	const matchingFilters: SpecStatus[] = activeFilters.map(filter =>
		checkIfFilterMatches(filter, sample, filters, fields)
	);
	const fullMatchFilters = matchingFilters.filter(status => status === SpecStatus.Match);
	const partialMatchFilters = matchingFilters.filter(
		status => status === SpecStatus.PartialMatch
	);
	const PARTIAL_MATCH_WEIGHT = 0.5;
	return (
		((fullMatchFilters.length + partialMatchFilters.length * PARTIAL_MATCH_WEIGHT) /
			activeFilters.length) *
		100
	);
}

export function checkIfFilterMatches(filter, field, filters, fields) {
	return filter.isMatch
		? filter.isMatch(filter.value, field[filter.id], filters, fields)
		: filter.value == field[filter.id]
		? SpecStatus.Match
		: SpecStatus.NoMatch;
}

export function checkIfFieldMatches(field, filter, filters, fields): SpecStatus {
	if (field.value === "") {
		return SpecStatus.Match;
	}
	const isEqual = filter.value == field.value;
	const matchStatus = field.isMatch
		? field.isMatch(filter.value, field.value, filters, fields)
		: isEqual
		? SpecStatus.Match
		: SpecStatus.NoMatch;
	return matchStatus;
}
