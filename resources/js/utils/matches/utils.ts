export function getMatchingPercentage(sample, filters) {
	const activeFilters = filters.filter(filter => filter.value != "");
	const matchingFilters = activeFilters.filter(filter => filter.value == sample[filter.id]);
	return (matchingFilters.length / activeFilters.length) * 100;
}
