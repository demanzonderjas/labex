import { TExchangeAttempt } from "../../typings/exchanges";
import { TFormField } from "../../typings/forms";
import { TSpecStatus } from "../../typings/specifications";
import { fieldMeetsDependencies, fieldShouldBeIgnoredInMatch } from "../filters/fields";
import { createQueryStringFromFilters } from "../formatting/matches";

export function getMatchingPercentage(
	attempt: TExchangeAttempt,
	filters: TFormField[],
	fields: TFormField[]
): number {
	const activeFilters = filters.filter(
		(filter: TFormField) =>
			filter.value != "" &&
			!filter.hidden &&
			fieldMeetsDependencies(filter, 0, fields) &&
			!fieldShouldBeIgnoredInMatch(filter)
	);
	const matchingFilters: TSpecStatus[] = activeFilters.map(filter =>
		checkIfFilterMatches(filter, attempt, filters, fields)
	);
	const fullMatchFilters = matchingFilters.filter(status => status === TSpecStatus.Match);
	const partialMatchFilters = matchingFilters.filter(
		status => status === TSpecStatus.PartialMatch
	);
	const PARTIAL_MATCH_WEIGHT = 0.5;
	return (
		((fullMatchFilters.length + partialMatchFilters.length * PARTIAL_MATCH_WEIGHT) /
			activeFilters.length) *
		100
	);
}

export function checkIfFilterMatches(
	filter: TFormField,
	attempt: TExchangeAttempt,
	filters: TFormField[],
	fields: TFormField[]
) {
	const matchingSpec = attempt.specifications.find(s => s.key == filter.id);
	return filter.isMatch
		? filter.isMatch(filter.value, matchingSpec?.value, filters, fields)
		: filter.value == matchingSpec?.value
		? TSpecStatus.Match
		: TSpecStatus.NoMatch;
}

export function checkIfFieldMatches(
	field: TFormField,
	filter: TFormField,
	filters: TFormField[],
	fields: TFormField[]
): TSpecStatus {
	if (field.value === "") {
		return TSpecStatus.Match;
	}
	const isEqual = filter.value == field.value;
	const matchStatus = field.isMatch
		? field.isMatch(filter.value, field.value, filters, fields)
		: isEqual
		? TSpecStatus.Match
		: TSpecStatus.NoMatch;
	return matchStatus;
}

export function goToSelectMatchLink(history, attempt: TExchangeAttempt, filters: TFormField[]) {
	const queryStringFromFilters = createQueryStringFromFilters(filters);
	history.push(`/app/${attempt.attempt_type}s/select/${attempt.id}${queryStringFromFilters}`);
}
