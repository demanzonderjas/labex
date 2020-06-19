export function getMatchingPercentage(sample, filters) {
	const activeFilters = filters.filter(filter => filter.value != "" && !filter.hidden);
	const matchingFilters = activeFilters.filter(filter =>
		checkIfFilterMatches(filter, sample, filters)
	);
	return (matchingFilters.length / activeFilters.length) * 100;
}

export function checkIfFilterMatches(filter, field, filters) {
	return filter.isMatch
		? filter.isMatch(filter.value, field[filter.id], filters)
		: filter.value == field[filter.id];
}

export function checkIfFieldMatches(field, filter, filters) {
	return field.isMatch
		? field.isMatch(filter.value, field.value, filters)
		: filter.value == field.value;
}
