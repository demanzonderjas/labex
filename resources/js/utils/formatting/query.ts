import qs from "query-string";

export function parseQueryString() {
	const queryString = window.location.search;
	return qs.parse(queryString);
}
