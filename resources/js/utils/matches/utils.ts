export function getMatchingPercentage(sample, filters) {
	const activeFilters = filters.filter(filter => filter.value != "" && !filter.hidden);
	const matchingFilters = activeFilters.filter(filter =>
		filter.isMatch
			? filter.isMatch(filter.value, sample[filter.id], filters)
			: filter.value == sample[filter.id]
	);
	return (matchingFilters.length / activeFilters.length) * 100;
}
