import { useLocation } from "react-router-dom";
import qs from "query-string";

export function useQuery() {
	const queryString = useLocation().search;
	return qs.parse(queryString);
}
